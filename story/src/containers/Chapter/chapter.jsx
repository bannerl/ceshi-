import React from 'react';
import { render } from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { loadUrl } from '../../util/util';
import {getChapter} from '../../fetch/chapter/chapter';
import store from '../../util/localStore';
import {Button ,Icon,List,Toast,NavBar } from 'antd-mobile';
import { hashHistory } from 'react-router';
import './style.scss';

class Chapter extends React.Component {
	constructor (props,context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			data:[],   // 用于储存章节内容
			isLoadingMore:false,
			hasMore: true,
			index: 0, // 章节索引
		};
	}
	
	componentDidMount() {
		const href = window.location.href;
		const obj = loadUrl(href);
		const title = obj.title.replace('+'," ");
		const index = obj.index;
		
		this.getChapterData(obj.url,obj.code,title,index);
		
		function callback() {
            const bottom = this.refs.chapter.getBoundingClientRect().bottom - 1000;
            const windowHeight = window.screen.height
            if (bottom && bottom < windowHeight) {
                // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
                this.loadMoreFn();
                this.setState({
                	isLoadingMore: true
                });
            }
        }
		
        window.addEventListener('scroll',  () => {
            if (this.state.isLoadingMore) {
                return;
            }
            callback.bind(this)();
        }, false);
	}
	
	getChapterData(url,code,title,index,boo) {
		code = 1;
		if(!boo){
			Toast.loading('加载中', 20, () => {});	
		}
		
		const result = getChapter(url,code);
		
		result.then(res => {
			return res.json()
		}).then(json => {
			const arr = [{
				content:json.content,
				title
			}];
			//如果数组不为0则是上拉加载
			let data = this.state.data;
			if(data.length>0){
				data.push({
					content:json.content,
					title
				});
				this.setState({
					data,
					index
				});
			}else{
				this.setState({
					data: arr,
					index
				});
			}
			this.setState({
            	isLoadingMore: false
            });
			Toast.hide();
		});
	}
	
	loadMoreFn() {
		const list = store.get('list');
		const index = this.state.index-0+1;
		
		const url = list[index].href;
		const code = list[index].code;
		const title = list[index].text;
		
		this.getChapterData(url,code,title,index,2);
	}
	
	render () {
		const {data} = this.state;
		const result = data.length>0
		?data.map((item,i) => {
			return (<div class="chapter-item" key={i}>
					<div class="title">{item.title}</div>
					<div class="content" dangerouslySetInnerHTML={{__html: item.content}}></div>
				</div>)
		})
		:'';
		
		return (
			<div class="chapter-wrapper" ref="chapter">
				{result}
			</div>
		)
	}	
}

export default Chapter;