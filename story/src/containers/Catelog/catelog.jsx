import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

class Catelog extends React.Component {
	constructor (props,context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render () {
		return (
			<div>111</div>
		)
	}
}


export default Catelog;