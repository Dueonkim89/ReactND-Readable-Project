import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostVoteScore } from '../actions/index.js';
import { withRouter } from 'react-router-dom';
import { Jumbotron, Button, Row, Col } from 'react-bootstrap';
import downArrowIcon from '../icons/downArrowIcon.svg';
import upArrowIcon from '../icons/upArrowIcon.svg';
import DisplayComments from './DisplayComments.js';

class RouteThePosts extends Component {	
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
		voteOnPost: (data) => dispatch(fetchPostVoteScore(data))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RouteThePosts));