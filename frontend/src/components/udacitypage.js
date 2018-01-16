import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DisplayPosts from './DisplayPosts.js';

class UdacityPage extends Component {
			
	render() {
		return (
			<DisplayPosts filterWord={'udacity'}/>		
		);
	} 
}

export default withRouter(connect(null, null)(UdacityPage));