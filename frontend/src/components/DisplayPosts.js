import React, { Component } from 'react';
import * as ServerCall from '../utils/api.js';
import { Link } from 'react-router-dom';
import downArrowIcon from '../icons/downArrowIcon.svg';
import upArrowIcon from '../icons/upArrowIcon.svg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Jumbotron, Button, Row, Col } from 'react-bootstrap';
import { v4 } from 'uuid';
import PostModal from './PostModal.js';
import { fetchPostVoteScore, sortByVoteOrder, sortByNewestDate, sortByOldestDate, createNewPost, 
deleteCommentOrPost, makeChangesToPost
} from '../actions/index.js';

class DisplayPosts extends Component {
	constructor(...args) {
		super(...args);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = { 
						id: '',
						showPostModal: false, 
						categoryMissing: false,
						postBody: '',
						postAuthor: '',
						postTitle: '',
						category: null,
						filterWord: null,
						disableSelectMenu: false,
						disableAuthorChange: false,
						editMode: false
					};
	}	

	componentDidMount() {
		const { filterWord } = this.props;
		this.setState({ filterWord, category: 'default' });
		//set category to disabled select option. 
	}	
	
	getDate = (posixNumber) => {
		return new Date(posixNumber).toLocaleDateString();
	}
	
	vote = (id, choice) => {
		const voteInfo = {
			type: 'posts',
			id,
			choice
		}
		this.props.voteOnPost(voteInfo)
	}
	
	sortByVoteScore = () => {		
		this.props.sortByVotes();
	}
	
	sortByOldest = () => {		
		this.props.sortByOld();
	}
	
	sortByNewest = () => {		
		this.props.sortByNew();
	}
	
	handleShow() {
		this.setState({ showPostModal: true });
	}
	
	handleClose() {
		this.setState({ showPostModal: false, postBody: '', postAuthor: '', postTitle: '',  category: 'default', 
		categoryMissing: false, editMode: false, disableAuthorChange: false, disableSelectMenu: false });
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
	
	updateCategory = (category) => {
		this.setState({ category });
	}
	
	editPost = (id) => {
		ServerCall.getSpecificPost(id).then((data) => {
			this.setState({ id, disableSelectMenu: true, disableAuthorChange: true, postTitle: data.title, 
			postBody: data.body, postAuthor: data.author, category: data.category, editMode: true });
			this.handleShow();
		})		
	}
	
	deletePost = (id) => {
		const postToDelete = {
			type: 'posts',
			id
		}
		this.props.deleteThePost(postToDelete);		
	}
	
	submitEditedPost = () => {
		//object with these properties: id, timestamp, body, title
		const timestamp = Date.now();
		const { postTitle, postBody, id } = this.state;
		const postPayLoad = {
			id,
			timestamp,
			body: postBody,
			title: postTitle
		}		
		this.props.makeChangesToPost(postPayLoad);
		this.handleClose();
	}	
	
	submitPost = () => {
		//to submitPost we need: id, timestamp, title, body, author, category
		// category, title, body, author will be from state
		//id will be from uuid npm and timestamp will be Date.now()
		const { category, postTitle, postBody, postAuthor } = this.state;
		if (category === 'default') {
			//categoryMissing state will trigger warning to user if true.
			this.setState({ categoryMissing: true });
		} else {
			const uniqueID = v4();		
			this.setState({ id: uniqueID.slice(uniqueID.length-12, uniqueID.length) });
			const postInfo = {
				id: uniqueID.slice(uniqueID.length-12, uniqueID.length),
				timestamp: Date.now(),
				title: postTitle,
				body: postBody,
				author: postAuthor,
				category
			}
			//dispatch action to create new post.
			this.props.submitNewPost(postInfo);
			this.handleClose();
		}				
	}
		
	render() {
		const { filterWord, showPostModal, postBody, postAuthor, postTitle, category, categoryMissing, 
		disableAuthorChange, disableSelectMenu, editMode } = this.state;
		const { posts } = this.props;
		return (
				<div>
					<PostModal hide={this.handleClose} value={showPostModal}
						updateAuthor={this.updateAuthor} updatePost={this.updatePost}
						submitPost={this.submitPost} post={postBody} author={postAuthor}
						title={postTitle} updateTitle={this.updateTitle} category={category}
						updateCategory={this.updateCategory} categoryMissing={categoryMissing}
						disableAuthorChange={disableAuthorChange} disableSelectMenu={disableSelectMenu}
						editMode={editMode} submitEditedPost={this.submitEditedPost}
					/>				
					{/* Button Div displayed on top of subsections*/}
					<Jumbotron className="buttonDiv" style={{margin: '0', padding:'0 2.5rem', backgroundColor: '#D2D2D2'}}>
						<Row>			
							<Col xs={6} sm={2} md={2}>
								<Button onClick={ () => this.sortByVoteScore() } 
										style={{padding:'1.25rem 1.25rem', fontSize:'1.5rem'}} 
										bsStyle="link">
										Popular
								</Button>
							</Col>
							<Col xs={6} sm={1} md={2}>
								<Button onClick={ () => this.sortByNewest() } 
									style={{padding:'1.25rem 1.25rem', fontSize:'1.5rem'}} 
									bsStyle="link">
									New
								</Button>
							</Col>
							<Col xs={6} sm={1} md={2}>
								<Button onClick={ () => this.sortByOldest() } 
									style={{padding:'1.25rem 1.25rem', fontSize:'1.5rem'}} 
									bsStyle="link">
									Old
								</Button>
							</Col>
							<Col xs={6} sm={2} md={2}>
								<Button onClick={this.handleShow} 
									style={{padding:'1.25rem 1.25rem', fontSize:'1.5rem'}} 
									bsStyle="link">
									Create New Post
								</Button>
							</Col>
						</Row>
					</Jumbotron>
					{/* If, filter word is none. map through all of the posts*/}
					{filterWord === 'none' && posts.map( eachPost => (
						<Row className="postContainer" key={eachPost.id}>
							<Col xs={1} md={1} className='iconDiv'>
								<a className="topArrow" onClick={ ()=> this.vote(eachPost.id, 'upVote') }>	
									<img src={upArrowIcon} alt='Up Arrow Icon'/>
								</a> 
								<a className="downArrow" onClick={ ()=> this.vote(eachPost.id, 'downVote') }>																
									<img src={downArrowIcon} alt='Down Arrow Icon'/>
								</a>
								{ eachPost.voteScore < 0 ? (
									<span className="voteScoreNegative">{eachPost.voteScore}</span>	
								) : (
									<span className="voteScore">{eachPost.voteScore}</span>	
								)}									
							</Col>
							<Col xs={11} md={9} className='titleDiv'>
								<Link to={`/${eachPost.category}/${eachPost.id}`} className='listTitle'>{eachPost.title}</Link>
								<div className='categoryDiv'>
									<span className='category'>Category: {eachPost.category}</span>
									<span className='author'>Author: {eachPost.author}</span>
									<span className='date'>Date: {this.getDate(eachPost.timestamp)}</span>
									<span className='comments'>Comments: {eachPost.commentCount}</span>
									<Button onClick={ ()=> this.editPost(eachPost.id) } 
											className='editPostButton'
											bsStyle="info">
											Edit
									</Button>									
									<Button onClick={ () => this.deletePost(eachPost.id) } 
											className='deletePostButton'
											bsStyle="info">
											Delete
									</Button>									
								</div>																
							</Col>										
						</Row>															
					))}	
					{/* Filter posts thru specific filterWord then map through all of the posts*/}
					{posts.filter(post => post.category === filterWord).map( eachPost => (
						<Row className="postContainer" key={eachPost.id}>
							<Col xs={1} md={1} className='iconDiv'>
								<a className="topArrow" onClick={ ()=> this.vote(eachPost.id, 'upVote') }>	
									<img src={upArrowIcon} alt='Up Arrow Icon'/>
								</a> 
								<a className="downArrow" onClick={ ()=> this.vote(eachPost.id, 'downVote') }>																
									<img src={downArrowIcon} alt='Down Arrow Icon'/>
								</a>
								{ eachPost.voteScore < 0 ? (
									<span className="voteScoreNegative">{eachPost.voteScore}</span>	
								) : (
									<span className="voteScore">{eachPost.voteScore}</span>	
								)}									
							</Col>
							<Col xs={11} md={9} className='titleDiv'>
								<Link to={`/${eachPost.category}/${eachPost.id}`} className='listTitle'>{eachPost.title}</Link>
								<div className='categoryDiv'>
									<span className='category'>Category: {eachPost.category}</span>
									<span className='author'>Author: {eachPost.author}</span>
									<span className='date'>Date: {this.getDate(eachPost.timestamp)}</span>
									<span className='comments'>Comments: {eachPost.commentCount}</span>
									<Button onClick={ ()=> this.editPost(eachPost.id) } 
											className='editPostButton'
											bsStyle="info">
											Edit
									</Button>									
									<Button onClick={ () => this.deletePost(eachPost.id) } 
											className='deletePostButton'
											bsStyle="info">
											Delete
									</Button>										
								</div>																
							</Col>										
						</Row>															
					))}
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
		sortByVotes: (data) => dispatch(sortByVoteOrder(data)),
		sortByNew: (data) => dispatch(sortByNewestDate(data)),
		sortByOld: (data) => dispatch(sortByOldestDate(data)),
		submitNewPost: (data) => dispatch(createNewPost(data)),
		deleteThePost: (data) => dispatch(deleteCommentOrPost(data)),
		makeChangesToPost: (data) => dispatch(makeChangesToPost(data))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisplayPosts));