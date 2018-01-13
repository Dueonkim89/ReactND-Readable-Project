import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import downArrowIcon from '../icons/downArrowIcon.svg';
import upArrowIcon from '../icons/upArrowIcon.svg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchVoteScore } from '../actions/index.js';

class DisplayPosts extends Component {
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
		
	render() {
		const { posts } = this.props;
		return (
				<div>
					{posts.map( eachPost => (
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

function mapDispatchToProps(dispatch) {
	return {
		voteOnPost: (data) => dispatch(fetchVoteScore(data))
	}
}


export default withRouter(connect(null, mapDispatchToProps)(DisplayPosts));