import React, { Component } from 'react';
import logo from './logo.svg';
import {connect} from 'react-redux';
import "./App.css";
import './index.css';
import { bindActionCreators } from 'redux';
import {getUserInfo} from './data/service';
class Apps extends Component {
	
	constructor(props) {
	    super();
	    this.state = {text:''};
	}
	
	
  render() {
  	 const { editCount, userinfo } = this.props
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
         	ssd{userinfo.count}
        </p>
        <div onClick={editCount}>增加</div>
      </div>
    );
  }
  componentDidMount(){
  	let a = {"offset":0,"limit":15,"cateId":1,"lineId":0,"stationId":0,"areaId":0,"sort":"default","deal_attr_23":"","deal_attr_24":"","deal_attr_25":"","poi_attr_20043":"","poi_attr_20033":""}
  	 var result = fetch('api/channel/deal/list',{
      credentials: 'include',
      method:'POST',
      headers: {
      	"Access-Control-Allow-Origin":"*",
      	"Connection":"keep-alive",
          'Accept': 'application/json, text/plain, */*',
          "Content-Type":"application/json; charset=utf-8"
      },
      body:JSON.stringify(a)
  	 
  	 })

    result.then(res => {
        return res.text()
    }).then(text => {
        console.log(text)
    })
   
  }

}


let	ss = {type:'increase'}


function mapStateToProps(state) {
    return {
        userinfo: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        editCount: function(){
        	return dispatch(ss)
        }
        
    }
}

const App = connect (
	mapStateToProps,
	mapDispatchToProps
)(Apps)

export default App;
