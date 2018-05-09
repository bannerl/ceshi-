import React from 'react';
import { render } from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { loadUrl } from '../../util/util';
import {getDetail} from '../../fetch/Detail/detail'
import {Button ,Icon,List,Toast,NavBar } from 'antd-mobile';
import store from '../../util/localStore'; 
import {hashHistory} from 'react-router';
import './style.scss';

const Item = List.Item;
const Brief = Item.Brief;

class Detail extends React.Component {
	constructor (props,context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			url:'',
			list:[],
			title:'',
			code: ''
			
		}
	}
	componentWillMount() {
		
	}
	componentDidMount() {
		
	  Toast.loading('加载中', 2, () => {});	
	  
	  const url = window.location.href;
	  const obj = loadUrl(url);
	  if(store.get('list').length<0){
	  	this.setState({
	  		list: store.get('list')
	  	});
	  	
	  	//return;
	  }else{
	  	  const result = getDetail({url:obj.url,host:obj.host});
	  
		  result.then(res => {
		  	return res.json();
		  }).then(json => {
		  	
		  	this.setState({
		  		title: json.title,
		  		code: json.code
		  	});
		  	//目录保存在本地
		  	store.set('list',json.info);
		  	Toast.hide();
		  });
	  }
	  
	}
	
	//点击事件
	clickHandle(item,i) {
		console.log(item)
		const url = item.href;
		const code = this.state.code;
		const title = item.text;
		hashHistory.push({
			pathname:'chapter',
			query: {
				url,
				code,
				title,
				index:i //目的是知道当前小说的索引，以便上一张下一章
			}
		});
		
	}
	
	render () {
		const {title} = this.state;
		const list = store.get('list');
		const result = list.length>0
		? list.map((item,i) =>{
			if(i>10){
				return
			}
			return <Item key={i} onClick={this.clickHandle.bind(this,item,i)}>{item.text}</Item>
		}):'';
		return (
			<div class="detail-wrapper">
			<NavBar
		        mode="dark"
		        icon={<Icon type="left" />}
		        onLeftClick={() => console.log('onLeftClick')}
		    >详情</NavBar>
		    <div class="title">{title}</div>
		    <div class="cate">目录</div>
			<div class="list-container">
				{result}
			</div>
			</div>
		)
	}
}

export default Detail;