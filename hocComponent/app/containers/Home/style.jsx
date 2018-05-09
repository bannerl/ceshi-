import React from 'react';
import { render } from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types';
import Home from './home';
import './style.scss';
import { hashHistory } from 'react-router';
import Button from '../../components/Button/button';

class Name extends React.Component {
	constructor (props,context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	clickHandle() {
		hashHistory.push('Twitter')
	}
	
	render () {
		const {title,desc} = this.props;
		return (
			<div>
				<div>Title<span>--- {title} ---</span></div>
				<div  >Desc<span>--- {desc} ---</span></div>
				<input />
				<Home vla="1" />
				<Button title="前往 渲染回调模式" type="primary" clickHandle={this.clickHandle.bind(this)}></Button>
			</div>
		)
	}
}

Name.propTypes = {
	title:PropTypes.string,
	desc:PropTypes.string
}

Name.defaultProps = {
	title:'这是默认标题',
	desc:'这是默认描述'
}

export default Name;