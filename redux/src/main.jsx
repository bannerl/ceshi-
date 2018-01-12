import React from 'react';
import ReactDOM from 'react-dom';


import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Router,hashHistory,Route,Link} from 'react-router';


function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}
import App from './App';


//const store = createStore(counter);
function as (data){
	const store = createStore(counter, data,
        // 触发 redux-devtools
        window.devToolsExtension ? window.devToolsExtension() : undefined
    )
	return store
}
const store = as()


const Index = <Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={App} ></Route>
		</Router>
	</Provider>;

ReactDOM.render(Index, document.getElementById('root'));

