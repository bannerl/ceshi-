import React from 'react';
import { Router, Route ,hashHistory ,IndexRoute} from 'react-router';

import Index from '../containers/index';
import Search from '../containers/Search/search';
import CateLog from '../containers/Catelog/catelog';
import Home from '../containers/Home/home';
//import Chapter from './containers/Chapter/chapter';
//import User from './containers/User/user';
import NotFound from '../containers/404';

class RouterMap extends React.Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={Index}>
					<IndexRoute component={Home} />
					<Route path="/search" component={Search} />
					<Route path="/catelog" component={CateLog}></Route>
					<Route path="*" component={NotFound}></Route>
				</Route>
			</Router>
		)
	}
	
}

export default RouterMap;