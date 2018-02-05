import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { NavBar,SearchBar, Button ,Icon } from 'antd-mobile';

class Search extends React.Component {
	constructor (props,context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
		    value: '',
		};
	}
	
	componentDidMount() {
	    this.autoFocusInst.focus();
	}
	onChange(value) {
	    this.setState({ value });
	};
	handleClick() {
	    this.manualFocusInst.focus();
	}
	
	search() {
		console.log(this.state.value)
	}
	
	render () {
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
			</div>
		)
	}
}


export default Search;