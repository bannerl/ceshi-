import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bsStyles,bsClass} from '../../../util/util';
import a from './a';

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        
    }
    render() {
    	console.log(this.props);
    	console.log(333);
        return (
            <button {...this.props}>{this.props.value}</button>
        )
    }
}

export default a(Home);
