import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getComments, fetchVoteScore } from '../actions/index.js';
import * as ServerCall from '../utils/api.js';
import { withRouter } from 'react-router-dom';
import { Jumbotron, Button, Row, Col } from 'react-bootstrap';
import downArrowIcon from '../icons/downArrowIcon.svg';
import upArrowIcon from '../icons/upArrowIcon.svg';

class RouteThePosts extends Component {	
	state = {
		postInfo: null,
		numberOfComments: null
	}
	
	vote = (id, choice) => {
		const voteInfo = {
			type: 'posts',
			id,
			choice
		}
		this.props.voteOnPost(voteInfo)
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
		//set redux store for comments and create state for individual post passed as a prop
		this.getComments(postInfo);
		this.setState({ postInfo });
	}

	render() {
		const { postInfo, numberOfComments } = this.state;
		const { posts } = this.props;
		console.log(this.state)
		return (
				<div>
					<Jumbotron className="buttonDiv" style={{margin: '0', padding:'0 2.5rem', backgroundColor: '#D2D2D2'}}>
						<Row>			
							<Col xs={6} sm={2} md={2}>
								<Button onClick={ () => console.log('create modal to edit post') } 
										style={{padding:'1.25rem 1.25rem', fontSize:'1.5rem'}} 
										bsStyle="link">
										Edit Post
								</Button>
							</Col>
							<Col xs={6} sm={1} md={2}>
								<Button onClick={ () => console.log('created option to delete post')} 
									style={{padding:'1.25rem 1.25rem', fontSize:'1.5rem'}} 
									bsStyle="link">
									Delete Post
								</Button>
							</Col>
						</Row>
					</Jumbotron>
					{postInfo !== null && posts.filter(post => post.id === postInfo).map( eachPost => (
						<div key={eachPost.id}>
							<Row className="routePostContainer">
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
							<Row className="commentButtonContainer">
								<Col xs={5} xsOffset={1}>
									<span className='comments'>{numberOfComments} Comments </span>
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
		voteOnPost: (data) => dispatch(fetchVoteScore(data))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RouteThePosts));