import React from 'react';
import {render} from 'react-dom';
import { Router, Route ,hashHistory ,IndexRoute} from 'react-router';

import RouterMap from './router/router';
import './static/css/common.scss';

render (
	<RouterMap />,
	document.getElementById('root')
)
