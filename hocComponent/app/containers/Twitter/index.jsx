import React from 'react';

import Content from '../../components/Content/content';
import Cell from '../../components/Cell/cell';
import Button from '../../components/Button/button';
class Home extends React.Component {
	constructor (props,context) {
		super(props,context);
		this.state  = {
			index:'0'
		}
	}
	componentDidMount() {
		
	}
	
	clickHandle() {
		this.setState({
			index: this.state.index+1+''
		})
	}
	render () {
		let {index} = this.state;
		index = index + '';
		return (
			<div>
				<Content title="类" ></Content>
				<Button title="这是按钮" type="primary" clickHandle={this.clickHandle.bind(this)}></Button>
				<Cell title={this.state.index}></Cell>
			</div>
		)
	}

}

export default Home;
