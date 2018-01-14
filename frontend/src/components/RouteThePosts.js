import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getComments } from '../actions/index.js';
import * as ServerCall from '../utils/api.js';
import { withRouter } from 'react-router-dom';

class RouteThePosts extends Component {	

	getComments = (id) => {
		const { comments } = this.props;
		/*check current comments being retrieved from server against comments in store.
			if comments already exist, do not dispatch action */
		ServerCall.getCommentsPerPost(id).then( (data) => {
			data.forEach(eachData => {
				if ((comments.findIndex(x => x.id === eachData.id)) === -1) {
					this.props.getComment(eachData);
				}
			})														
		})
	}

	
	componentDidMount() {
		const { postInfo } = this.props;
		//set state for comments
		this.getComments(postInfo.id);
	}

	render() {
		console.log(this.props.postInfo);
		return (
			<div>Hello world</div>
		);
	} 
}

function mapStateToProps({ comments }) {
	return {
		comments
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getComment: (data) => dispatch(getComments(data))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RouteThePosts));