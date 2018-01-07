import React, { Component } from 'react';
import { setCategories, getPosts } from '../actions/index.js';
//import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
//import * as ServerCall from '../utils/api.js'
import { Route, withRouter } from 'react-router-dom';
import DisplayPosts from './DisplayPosts.js';

class ReduxPage extends Component {
			
	render() {
		const { posts } = this.props;
		return (
			<DisplayPosts posts={posts.filter(post => post.category === 'redux')}/>																													
		);
	} 
}


function mapStateToProps({ posts }) {
	return {
		posts
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setCategory: (data) => dispatch(setCategories(data)),
		getPost: (data) => dispatch(getPosts(data))
	}
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReduxPage));
