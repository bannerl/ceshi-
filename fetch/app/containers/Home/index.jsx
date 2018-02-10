import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Do from './subpage/Category';

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <h1>home</h1>
                <Do id="1" value="2" />
            </div>
        )
    }
}

export default Home
