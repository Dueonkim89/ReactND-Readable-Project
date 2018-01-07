import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import downArrowIcon from '../icons/downArrowIcon.svg';
import upArrowIcon from '../icons/upArrowIcon.svg';

class DisplayPosts extends Component {
	getDate = (posixNumber) => {
		return new Date(posixNumber).toLocaleDateString();
	}	
	
	render() {
		const { posts } = this.props;
		return (
				<div>
					{posts.map( eachPost => (							
						<Row className="postContainer" key={eachPost.id}>
							<Col xs={1} md={1} className='iconDiv'>
								<a className="topArrow" onClick={()=> console.log('increment voteScore by 1')}>	
									<img src={upArrowIcon} alt='Up Arrow Icon'/>
								</a> 
								<a className="downArrow" onClick={()=> console.log('decrement voteScore by 1')}>																
									<img src={downArrowIcon} alt='Down Arrow Icon'/>
								</a>
								{ eachPost.voteScore < 0 ? (
									<span className="voteScoreNegative">{eachPost.voteScore}</span>	
								) : (
									<span className="voteScore">{eachPost.voteScore}</span>	
								)}									
							</Col>
							<Col xs={11} md={9} className='titleDiv'>
								<Link to={`/${eachPost.id}`} className='listTitle'>{eachPost.title}</Link>
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

export default DisplayPosts;