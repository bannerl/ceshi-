import React from 'react';
import { render } from 'react-dom';

import PureRenderMixin from 'react-addons-pure-render-mixin'



export default function a(WrapperComponent) {
	class Names extends React.Component {
		constructor (props,context) {
			super(props,context);
			this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		}
		render () {
			return (
				<WrapperComponent className="button" />
				
			)
		}
	}
	return Names

}