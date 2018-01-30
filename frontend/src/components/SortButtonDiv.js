import React, { Component } from 'react';
import { Jumbotron , Button, Col, Row } from 'react-bootstrap';

class SortButtonDiv extends Component {
	render() {
		const { sortByVoteScore, sortByNewest, sortByOldest, show } = this.props;
		return (
				<Jumbotron className="buttonDiv" style={{margin: '0', padding:'0 2.5rem', backgroundColor: '#D2D2D2'}}>
					<Row>			
						<Col xs={6} sm={2} md={2}>
							<Button onClick={ sortByVoteScore } 
									style={{padding:'1.25rem 1.25rem', fontSize:'1.5rem'}} 
									bsStyle="link">
									Popular
							</Button>
						</Col>
						<Col xs={6} sm={1} md={2}>
							<Button onClick={ sortByNewest } 
								style={{padding:'1.25rem 1.25rem', fontSize:'1.5rem'}} 
								bsStyle="link">
								New
							</Button>
						</Col>
						<Col xs={6} sm={1} md={2}>
							<Button onClick={ sortByOldest } 
								style={{padding:'1.25rem 1.25rem', fontSize:'1.5rem'}} 
								bsStyle="link">
								Old
							</Button>
						</Col>
						<Col xs={6} sm={2} md={2}>
							<Button onClick={ show } 
								style={{padding:'1.25rem 1.25rem', fontSize:'1.5rem'}} 
								bsStyle="link">
								Create New Post
							</Button>
						</Col>
					</Row>
				</Jumbotron>			
		)
	}	
}

export default SortButtonDiv;