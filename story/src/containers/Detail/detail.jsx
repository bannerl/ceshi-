import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin'

class Name extends React.Component {
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

function mapStateToProps () {
	
}

function mapDispatchToProps () {
	
}

const Names = connect (
	mapStateToProps,
	mapDispatchToProps
)(Name)

export default Names;