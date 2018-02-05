import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router';
import { Button } from 'antd-mobile';
import './style.scss';

class Index extends React.Component {
	constructor (props,context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render () {
		return (
			<div class="welcome-wrapper">
				<div class="welcome-text">
					<span>欢迎访问!!</span>
				</div>
				<div class="welcome-into">
					<Button href="#/search" size="large" type="warning" >进入</Button>
				</div>
			</div>
		)
	}
}

export default Index;