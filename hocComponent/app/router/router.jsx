import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Index from '../containers/index';
import HocStyle from '../containers/Home/hocStyle';
import NotFound from '../containers/404';
import Twitter from '../containers/Twitter/index';

class RouterMap extends React.Component {
	render () {
		return (
			<Router history={this.props.history}>
				<Route path="/" component={Index} >
					<IndexRoute component={HocStyle} />
					<Route path='/twitter' component={Twitter} />
					<Route  path='*' component={NotFound} />
				</Route>
			</Router>
		)
	}
}

export default RouterMap;