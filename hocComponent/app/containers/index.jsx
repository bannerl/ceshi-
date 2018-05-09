import React from 'react';
import { render } from 'react-dom';



class Index extends React.Component {
	constructor (props,context) {
		super(props,context);
		
	}
	render () {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
	
	
}

export default Index;