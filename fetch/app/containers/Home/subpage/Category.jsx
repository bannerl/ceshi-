import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bsStyles,bsClass} from '../../../util/util';
import "babel-polyfill";
class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        console.log(this.props);
    }
    render() {
    	
    	let a = {a:1,b:2};
    	
    	
//  	let b = {
//  		...a,
//  		c:1
//  	}
//  	console.log(b);
        return (
            <div {...this.props}>
                kkk
            </div>
        )
    }
}
 const State = {
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info'
};

export default bsStyles(
  Object.values(State),
  bsClass('alert', Home)
);
