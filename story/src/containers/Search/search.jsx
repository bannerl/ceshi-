import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { NavBar,SearchBar, Button ,Icon,List } from 'antd-mobile';
import { getSearchResult } from '../../fetch/search/search'; 
import { HashHistory } from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

class Search extends React.Component {
	constructor (props,context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
		    value: '',
		    data:[]
		};
	}
	
	componentDidMount() {
	    this.autoFocusInst.focus();
	}
	onChange(value) {
	    this.setState({ value });
	};
	
	search() {
		const result = getSearchResult(this.state.value);
		
		result.then((res) => {
			return res.json();
		}).then((json) => {
			this.setState({
				data:json
			})
		});
	}
	
	clickHandle(i) {
		HashHistory.push('');
	}
	
	render () {
		const result = this.state.data.length
			?this.state.data.map((item,i) => {
				return  <Item 
				arrow="horizontal" 
				key="{i}"  multipleLine 
				onClick={this.clickHandle.bind(this,i)}>
		          网络来源{i+1} 
		          <Brief>该小说</Brief>
		        </Item>
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
				    onCancel={this.search.bind(this)}
				    ref={ref => this.autoFocusInst = ref} />
				{
					this.state.data.length
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