import React, { Component } from 'react';
import '../App.css';
import { setCategories, getPosts } from '../actions/index.js';
//import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
//import * as ServerCall from '../utils/api.js'
import { Route, withRouter } from 'react-router-dom';
//import { LinkContainer } from 'react-router-bootstrap';

class UdacityPage extends Component {
			
	render() {
		console.log('in udacity page')
		return (
			<div className="App">	
				<div style={{ margin: '8rem'}}>This is the Udacity page</div>																													
			</div>
		);
	} 
}


function mapStateToProps({ categories, posts}) {
	return {
		categories,
		posts
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setCategory: (data) => dispatch(setCategories(data)),
		getPost: (data) => dispatch(getPosts(data))
	}
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UdacityPage));
