import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DisplayPosts from './DisplayPosts.js';

class ReactPage extends Component {
	render() {
		return (
			<DisplayPosts filterWord={'react'}/>		
		);
	} 
}

export default withRouter(connect(null, null)(ReactPage));