import React, { Component } from 'react';
import { connect } from 'react-redux';
import downArrowIcon from '../icons/downArrowIcon.svg';
import upArrowIcon from '../icons/upArrowIcon.svg';
import * as ServerCall from '../utils/api.js';
import { withRouter } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import { getComments, fetchCommentVoteScore, postCommentToServer, deleteComment, makeChangesToComment

} from '../actions/index.js';
import CommentModal from './CommentModal.js';
import { v4 } from 'uuid';

class DisplayComments extends Component {	
	constructor(...args) {
		super(...args);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = { 
						showModal: false, 
						editMode: false,
						postInfo: null,
						numberOfComments: null,
						commentBody: '',
						commentAuthor: '',
						disabled: false, 
						commentID: null
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
	
	submitComment = () => {
		// id, timestamp, body, author, parentId
		// parentId will be from postInfo (state), author and body from state
		//id will be from uuid, timestamp will be Date.now()
		let uniqueID = v4();
		const commentInfo = {
			id: uniqueID.slice(uniqueID.length-12, uniqueID.length),
			timestamp: Date.now(),
			body: this.state.commentBody,
			author: this.state.commentAuthor,
			parentId: this.state.postInfo
		}		
		this.props.postComment(commentInfo);
		this.handleClose();		
	}
	
	delete = (id) => {
		this.props.deleteTheComment(id);
	}
	
	editComment = (author, comment, id) => {
		this.handleShow();
		this.setState({ commentAuthor: author, commentBody: comment, disabled: true, editMode: true, commentID: id });
	}
	
	submitEditedComment = () => {
		const {  commentID, commentBody} = this.state;
		let timestamp = Date.now();
		const commentInfo = {
			id: commentID,
			timestamp,
			body: commentBody
		}
		this.props.changeComment(commentInfo);
		this.handleClose();
	}
	
	updateAuthor =(name) => {
		this.setState({ commentAuthor: name });
	}
	
	updateComment =(comment) => {
		this.setState({ commentBody: comment});
	}	
	
	handleClose() {
		this.setState({ showModal: false, commentAuthor: '', commentBody: '', disabled: false, editMode: false});
	}

	handleShow() {
		this.setState({ showModal: true });
	}	
	
	render() {
		const { comments } = this.props;
		const { numberOfComments, postInfo, showModal, commentBody, commentAuthor, editMode, disabled } = this.state;						
		return (
			<div>
				{/* TwoComment Modal Component with form field. One for editing comments, one for creating
				new comments.*/}
				<CommentModal hide={this.handleClose} value={showModal}  
					author={commentAuthor} comment={commentBody}
					updateAuthor={this.updateAuthor} updateComment={this.updateComment} 
					submitComment={this.submitComment} disable={disabled} editMode={editMode}
					submitEditedComment={this.submitEditedComment}
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
									<Button onClick={ ()=> this.editComment(eachComment.author, eachComment.body, eachComment.id) } 
											className='editCommentButton'
											bsStyle="primary">
											Edit
									</Button>									
									<Button onClick={ () => this.delete(eachComment.id) } 
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
		voteOnComment: (data) => dispatch(fetchCommentVoteScore(data)),
		postComment: (data) => dispatch(postCommentToServer(data)),
		deleteTheComment: (data) => dispatch(deleteComment(data)),
		changeComment: (data) => dispatch(makeChangesToComment(data)) 
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisplayComments));				