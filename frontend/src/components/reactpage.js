import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import DisplayPosts from './DisplayPosts.js';

class ReactPage extends Component {
	render() {
		const { posts } = this.props;
		return (
			<DisplayPosts posts={posts.filter(post => post.category === 'react')}/>		
		);
	} 
}

function mapStateToProps({ posts}) {
	return {
		posts
	}
}

export default withRouter(connect(mapStateToProps, null)(ReactPage));