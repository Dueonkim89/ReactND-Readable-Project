import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DisplayPosts from './DisplayPosts.js';

class ReduxPage extends Component {			
	render() {
		return (
			<DisplayPosts filterWord={'redux'}/>																													
		);
	} 
}


export default withRouter(connect(null, null)(ReduxPage));
