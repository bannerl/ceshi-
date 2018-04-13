import React, { Component, PropTypes } from 'react'
//import fetchUser from 'twitter'

class Twitter extends React.Component {
	   constructor () {
			super();
			
		}
  

	  componentDidMount () {
	    this.setState({
	    	user:'234'
	    })
	  }
	  
	  render () {
	    return (
	    	<div>{this.props.title}</div>
	    )
	  }
}

export default Twitter