import React, { Component } from 'react';
import { connect } from 'react-redux';
import downArrowIcon from '../icons/downArrowIcon.svg';
import upArrowIcon from '../icons/upArrowIcon.svg';
import * as ServerCall from '../utils/api.js';
import { withRouter } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import { getComments, fetchCommentVoteScore } from '../actions/index.js';
import CommentModal from './CommentModal.js';

class DisplayComments extends Component {	
	constructor(...args) {
		super(...args);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = { 
						showModal: false, 
						postInfo: null,
						numberOfComments: null,
						textAreaValue: '',
						inputValue: ''
					};
	}

	vote = (type, id, choice) => {
		//3rd argument for type. so we can take in comment as well. see server code.
		const voteInfo = {
			type,
			id,
			choice
		}
		this.props.voteOnComment(voteInfo)
	}	
	
	getDate = (posixNumber) => {
		return new Date(posixNumber).toLocaleDateString();
	}	
	
	getComments = (id) => {
		const { comments } = this.props;
		/*check current comments being retrieved from server against comments in store.
			if comments already exist, do not dispatch action */
		ServerCall.getCommentsPerPost(id).then( (data) => {
			this.setState({ numberOfComments: data.length });
			data.forEach(eachData => {
				if ((comments.findIndex(x => x.id === eachData.id)) === -1) {
					this.props.getComment(eachData);
				}
			})														
		})
	}	
	
	componentDidMount() {
		const { postInfo } = this.props;
		//set redux store for comments and create state for post.id passed as a prop
		this.getComments(postInfo);
		this.setState({ postInfo });
	}	
	
	showCommentModal() {
		//if argument is truthy
		// GET /comments/:id
		//provide id of comment so GET request can be sent over
		//then populate the modal form field with the info of the comments
		//if no argument, then just open the comment modal.
		//need to send in value true as a prop to CommentModal component. 	
	}
	
	handleClose() {
		this.setState({ showModal: false });
	}

	handleShow() {
		this.setState({ showModal: true });
	}	
	
	render() {
		const { comments } = this.props;
		const { numberOfComments, postInfo, showModal } = this.state;
		console.log(postInfo, showModal);
		return (
			<div>
				{/* Comment Modal Component with form field*/}
				<CommentModal hide={this.handleClose}
						value={showModal} 				
				/>				
				<Row className="commentButtonContainer">
					<Col xs={5} xsOffset={1} sm={2} md={2}>
						<span className='comments'>{numberOfComments} Comments </span>									
					</Col>
					<Col xs={5} sm={2} md={3}>
						<Button onClick={this.handleShow} 
										style={{padding:'0 1.25rem'}} 
										className='commentButton'
										bsStyle="link">
										Add Comment
						</Button>								
					</Col>
				</Row>							
				{comments.filter( x => x.parentId === postInfo).map( eachComment => (
					<div key={eachComment.id} className='commentDiv'>
						<Row className="commentContainer">
							<Col xs={1} md={1} className='iconDiv'>
								<a className="topArrow" onClick={ ()=> this.vote('comments', eachComment.id, 'upVote') }>	
									<img src={upArrowIcon} alt='Up Arrow Icon'/>
								</a> 
								<a className="downArrow" onClick={ ()=> this.vote('comments', eachComment.id, 'downVote') }>																
									<img src={downArrowIcon} alt='Down Arrow Icon'/>
								</a>
								{ eachComment.voteScore < 0 ? (
									<span className="voteScoreNegative">{eachComment.voteScore}</span>	
								) : (
									<span className="voteScore">{eachComment.voteScore}</span>	
								)}									
							</Col>
							<Col xs={11} md={9} className='titleDiv'>
								<h1 className='commentTitle'>{eachComment.body}</h1>
								<div className='categoryDiv'>
									<span className='author'>Author: {eachComment.author}</span>
									<span className='date'>Date: {this.getDate(eachComment.timestamp)}</span>
									<Button onClick={ () => console.log('create modal to edit comment') } 
											className='editCommentButton'
											bsStyle="primary">
											Edit
									</Button>									
									<Button onClick={ () => console.log('create action and reducer to delete comment') } 
											className='deleteCommentButton'
											bsStyle="primary">
											Delete
									</Button>											
								</div>																
							</Col>										
						</Row>													
					</div>
				))}
			</div>
		);	
	}
}		

function mapStateToProps({ comments, posts }) {
	return {
		comments,
		posts
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getComment: (data) => dispatch(getComments(data)),
		voteOnComment: (data) => dispatch(fetchCommentVoteScore(data))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisplayComments));				