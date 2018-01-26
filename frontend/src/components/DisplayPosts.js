import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import downArrowIcon from '../icons/downArrowIcon.svg';
import upArrowIcon from '../icons/upArrowIcon.svg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Jumbotron, Button, Row, Col } from 'react-bootstrap';
import { v4 } from 'uuid';
import PostModal from './PostModal.js';
import { fetchPostVoteScore, sortByVoteOrder, sortByNewestDate, sortByOldestDate, createNewPost 
} from '../actions/index.js';

class DisplayPosts extends Component {
	constructor(...args) {
		super(...args);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = { 
						showPostModal: false, 
						categoryMissing: false,
						postBody: '',
						postAuthor: '',
						postTitle: '',
						category: null,
						filterWord: null
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
		this.setState({ showPostModal: false, postBody: '', postAuthor: '', postTitle: '',  category: 'default', categoryMissing: false });
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
	
	submitPost = () => {
		console.log('create server method to submit post');
		//to submitPost we need: id, timestamp, title, body, author, category
		// category, title, body, author will be from state
		//id will be from uuid npm and timestamp will be Date.now()
		const { category, postTitle, postBody, postAuthor } = this.state;
		if (category === 'default') {
			//categoryMissing state will trigger warning to user if true.
			this.setState({ categoryMissing: true });
		} else {
			const uniqueID = v4();
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
			this.handleClose(postInfo);
		}				
	}
		
	render() {
		const { filterWord, showPostModal, postBody, postAuthor, postTitle, category, categoryMissing } = this.state;
		const { posts } = this.props;
		console.log(category);
		return (
				<div>
					<PostModal hide={this.handleClose} value={showPostModal}
						updateAuthor={this.updateAuthor} updatePost={this.updatePost}
						submitPost={this.submitPost} post={postBody} author={postAuthor}
						title={postTitle} updateTitle={this.updateTitle} category={category}
						updateCategory={this.updateCategory} categoryMissing={categoryMissing}
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
		submitNewPost: (data) => dispatch(createNewPost(data))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisplayPosts));