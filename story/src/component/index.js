import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Index extends React.Component {
	constructor (props,context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render () {
		const settings = {
			dots: true,
			infinite: true,
			speed: 800,
			slidesToShow: 1,
			autoplay: true
		};
		return (
			<div>
				ghgv  
			</div>
		)
	}
}


