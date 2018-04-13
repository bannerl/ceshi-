import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';

import './static/css/common.scss';

import RouterMap from './router/router';


render(
	<RouterMap history={hashHistory} />
	,
	document.getElementById('root')
)

