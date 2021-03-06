import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostVoteScore, makeChangesToPost, deleteCommentOrPost } from '../actions/index.js';
import { withRouter, Link } from 'react-router-dom';
import { Jumbotron, Button, Row, Col } from 'react-bootstrap';
import downArrowIcon from '../icons/downArrowIcon.svg';
import upArrowIcon from '../icons/upArrowIcon.svg';
import DisplayComments from './DisplayComments.js';
import PostModal from './PostModal.js';
import * as ServerCall from '../utils/api.js';

class RouteThePosts extends Component {	
	constructor(...args) {
		super(...args);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = { 
						showPostModal: false, 
						postBody: '',
						postAuthor: '',
						postTitle: '',
						category: '',
						disableSelectMenu: false,
						disableAuthorChange: false,
						editMode: false
					};
	}

	editPost = () => {
		ServerCall.getSpecificPost(this.props.postInfo).then((data) => {
			this.setState({ editMode: true, disableSelectMenu: true, disableAuthorChange: true, 
			postTitle: data.title, postBody: data.body, postAuthor: data.author, category: data.category });
		})		
	}
	
	submitEditedPost = () => {
		//object with these properties: id, timestamp, body, title
		const timestamp = Date.now();
		const { postTitle, postBody } = this.state;
		const postPayLoad = {
			id: this.props.postInfo,
			timestamp,
			body: postBody,
			title: postTitle
		}		
		this.props.makeChangesToPost(postPayLoad);
		this.handleClose();
	}
	
	deletePost = () => {
		const postToDelete = {
			type: 'posts',
			id: this.props.postInfo
		}
		this.props.deleteThePost(postToDelete);		
	}

	handleShow() {		
		this.editPost();
		this.setState({ showPostModal: true });
	}	
	
	handleClose() {
		this.setState({ showPostModal: false, disableSelectMenu: false, disableAuthorChange: false, 
		postTitle: '', postBody: '', postAuthor: '', category: '', editMode: false });
	}
	
	updateAuthor = (name) => {
		this.setState({ postAuthor: name });
	}
	
	updatePost = (post) => {
		this.setState({ postBody: post });
	}

	updateTitle = (title) => {
		this.setState({ postTitle: title });
	}	
	
	vote = (type, id, choice) => {
		//3rd argument for type. so we can take in comment as well. see server code.
		const voteInfo = {
			type,
			id,
			choice
		}
		this.props.voteOnPost(voteInfo)
	}
	
	getDate = (posixNumber) => {
		return new Date(posixNumber).toLocaleDateString();
	}
			
	render() {
		const { posts, postInfo } = this.props;
		const { showPostModal, disableSelectMenu, postBody, postAuthor, postTitle, category, 
		disableAuthorChange, editMode } = this.state;
		return (
				<div>
					<PostModal hide={this.handleClose} value={showPostModal} updateTitle={this.updateTitle}
						updateAuthor={this.updateAuthor} updatePost={this.updatePost}
						disableSelectMenu={disableSelectMenu} author={postAuthor} post={postBody}
						disableAuthorChange={disableAuthorChange} editMode={editMode}
						title={postTitle} category={category} submitEditedPost={this.submitEditedPost}
					/>
					<Jumbotron className="buttonDiv" style={{margin: '0', padding:'0 2.5rem', backgroundColor: '#D2D2D2'}}>
						<Row>			
							<Col xs={6} sm={2} md={2}>
								<Button onClick={this.handleShow} 
										style={{padding:'1.25rem 1.25rem', fontSize:'1.5rem'}} 
										bsStyle="link">
										Edit Post
								</Button>
							</Col>
							<Col xs={6} sm={1} md={2}>
								<Link to="/" onClick={this.deletePost}
									className='delete-button'
									style={{fontSize:'1.5rem'}} 
								>
									Delete Post
								</Link>
							</Col>
						</Row>
					</Jumbotron>
					{postInfo !== null && posts.filter(post => post.id === postInfo).map( eachPost => (
						<div key={eachPost.id} className='postDiv'>
							<Row className="routePostContainer">
								<Col xs={1} md={1} className='iconDiv'>
									<a className="topArrow" onClick={ ()=> this.vote('posts', eachPost.id, 'upVote') }>	
										<img src={upArrowIcon} alt='Up Arrow Icon'/>
									</a> 
									<a className="downArrow" onClick={ ()=> this.vote('posts', eachPost.id, 'downVote') }>																
										<img src={downArrowIcon} alt='Down Arrow Icon'/>
									</a>
									{ eachPost.voteScore < 0 ? (
										<span className="voteScoreNegative">{eachPost.voteScore}</span>	
									) : (
										<span className="voteScore">{eachPost.voteScore}</span>	
									)}									
								</Col>
								<Col xs={11} md={9} className='titleDiv'>
									<h1 className='postTitle'>{eachPost.title}</h1>
									<div className='categoryDiv'>
										<span className='category'>Category: {eachPost.category}</span>
										<span className='author'>Author: {eachPost.author}</span>
										<span className='date'>Date: {this.getDate(eachPost.timestamp)}</span>
									</div>																
								</Col>										
							</Row>
							<Row className="postBodyContainer">
								<Col xs={11} xsOffset={1}>
									<p className="postBody">{eachPost.body}</p>									
								</Col>
							</Row>							
						</div>
					))}
						{/* Pass parentId (postInfo) as a prop to DisplayComments component*/}	
						<DisplayComments postInfo={postInfo}/>
				</div>		
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
		voteOnPost: (data) => dispatch(fetchPostVoteScore(data)),
		makeChangesToPost: (data) => dispatch(makeChangesToPost(data)),
		deleteThePost: (data) => dispatch(deleteCommentOrPost(data))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RouteThePosts));