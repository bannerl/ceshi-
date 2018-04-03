import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { NavBar,SearchBar, Button ,Icon,List,Toast } from 'antd-mobile';
import { getSearchResult } from '../../fetch/search/search'; 
import { hashHistory } from 'react-router';
import store from '../../util/localStore';
import './style.scss';

const Item = List.Item;
const Brief = Item.Brief;

class Search extends React.Component {
	constructor (props,context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
		    value: '',
		    data:[],
		    historyArr:[],
		    searchValue:'' //搜索结果value值
		};
	}
	
	componentDidMount() {
		let historyArr = store.get('historyArr');
		
		if(historyArr != null){
			this.setState({
				historyArr
			});
		}
		
	    this.autoFocusInst.focus();
	}
	
	onChange(value) {
	    this.setState({ value });
	};
	//搜索
	search(value) {
		const val = value || this.state.value.trim();
		//判断是否有搜索内容
		if(!val.length>0){
			Toast.info('请输入搜索内容', 1);
			return;
		}
		//判断是否是胡乱打的
		if(/[A-Za-z]/.test(val)){
			Toast.info('搜索内容不能包含字母', 1);
			return;
		}
		
		let historyArr = this.state.historyArr;
	  	Toast.loading('加载中', 20, () => {});
	  	
		if(historyArr.length>0){
			//清除重复搜索记录
			historyArr = historyArr.filter(function(item,i){
				return item !== val;
			});
			historyArr.push(val);
			
			store.set('historyArr',historyArr);
		}else{
			historyArr = [val];
			store.set('historyArr',historyArr);
		}
		
		const result = getSearchResult(val);
		
		result.then((res) => {
			return res.json();
		}).then((json) => {
			if(json.length>0){
				this.setState({
					data:json,
					searchValue: this.state.value
				}); 
			}
			Toast.hide();
			
		});
	}
	//跳转小说首页
	clickHandle(url,host) {
		hashHistory.push({  
	        pathname: '/detail',  
	        query: {
	        	url,
	        	host
	        }
	    })      
	}
	//清空历史记录
	deleteHistory() {
		store.set('historyArr',null);
		this.setState({
			historyArr:[]
		})
	}
	//搜索历史搜索
	searchHandle(item) {
		this.setState({
			value: item
		});
		this.search(item)
	}
	
	render () {

		const result = this.state.data.length
			?this.state.data.map((item,i) => {
				return  <Item 
				arrow="horizontal" 
				key={i}  multipleLine 
				onClick={this.clickHandle.bind(this,item.url,item.host)}>
		          {this.state.searchValue}
		          <Brief>来源{i+1}</Brief>
		        </Item>
			})
			:'<div>，没有搜索结果</div>';
			
		const historyList = this.state.historyArr.length>0
			?this.state.historyArr.map((item,i) => {
				return <Item 
				arrow="horizontal" 
				key={i}  multipleLine 
				onClick={this.searchHandle.bind(this,item)}>
		          {item}
		        </Item>;
			})
			:'';
		return (
			<div class="search-wrapper">
				<NavBar
			        mode="dark"
			        icon={<Icon type="left" />}
			        onLeftClick={() => console.log('onLeftClick')}
			    >搜索</NavBar>
			    
			    <SearchBar 
			    	cancelText="搜索"
				    onChange={this.onChange.bind(this)} 
				    value={this.state.value} placeholder="请输入小说名称" 
				    onSubmit={this.search.bind(this)}
				    
				    ref={ref => this.autoFocusInst = ref} />
				    
				<div class="history-container">
					{
						this.state.historyArr.length&&this.state.data.length === 0
						?<List renderHeader={() => '搜索历史'} className="history-list">
					        {historyList}
					        <Item class="deleteHistory" onClick={this.deleteHistory.bind(this)}>清空历史记录</Item>
					    </List>
					    :''
					}
				</div>
				
				{
					this.state.data.length>0
					?<List renderHeader={() => '搜索结果'} className="my-list">
						{result}
				    </List> 
					:''
				}
				
			</div>
		)
	}
}


export default Search;