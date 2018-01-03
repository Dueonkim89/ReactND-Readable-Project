import React, { Component } from 'react';
import '../App.css';
import { setCategories, getPosts } from '../actions/index.js';
import { Nav, Navbar, NavItem, Jumbotron, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as ServerCall from '../utils/api.js'
import { Route, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import redditLogo from '../icons/redditLogo.svg';
import downArrowIcon from '../icons/downArrowIcon.svg';
import upArrowIcon from '../icons/upArrowIcon.svg';
import ReactPage  from './reactpage.js';
import ReduxPage  from './reduxpage.js';
import UdacityPage  from './udacitypage.js';

class App extends Component {
	state = {
		windowWidth: ''
	}
	
	getDimensions = () => {
		//this.setState({ windowWidth: window.innerWidth})
	}
	
	getPosts = () => {
		ServerCall.getPosts().then((data) => {
			data.forEach( post => {
				this.props.getPost(post);
			})
		})
	}
	
	getCategories = () => {
		ServerCall.getCategories().then((data) => {
			data.categories.forEach( category => {
				this.props.setCategory(category);
			})
		})		
	}
	
	componentDidMount() {
		//set states for category and posts in redux store to values found in server
		this.getCategories();
		this.getPosts();
		//window.addEventListener('resize', this.getDimensions);
	}
	
	componentWillUnmount() {	
		//window.removeEventListener('resize', this.getDimensions);
	}	
	
	render() {	
		const { categories } = this.props;
		console.log(this.props)
		return (
			<div className="App">
			{/* The default nav bar that shows up in every url path.*/}

				<Navbar bsStyle='default' fluid={true} style={{ marginBottom: '0rem', backgroundColor: '#C0C0C0'}}>
					<Navbar.Header style={{ margin: '1.5rem'}}>
						My Subscriptions: 
					</Navbar.Header>
					<Nav bsStyle="tabs" style={{ margin: '0'}}>
						{/* Map over this.props.categories to make nav links and route. 
							Allow routing for these Nav Items */}
							<LinkContainer exact={true} to="/">
								<NavItem className='navHover'>All</NavItem>
							</LinkContainer>
						{categories.map(( {name, path}, index ) => (
							<LinkContainer key={name} to={`/${path}`}>
								<NavItem className='navHover'>{name}</NavItem>	
							</LinkContainer>
						))}
					</Nav>
				</Navbar>
								
				<Jumbotron id="iconHolder" style={{margin: '0', padding:'0 3rem', backgroundColor: '#A2A2A2', color:'#F2F2F2'}}>
					<Row>
						<Col xs={4} sm={2} md={2}> <img style={{margin: '1.25rem 0 0 0'}} src={redditLogo} alt="logo" /></Col>
						<Col xs={8} sm={10} md={10}><h1 style={{ fontSize: '4.45rem',textAlign:'left'}}>/R/eadit</h1></Col>
					</Row>				
				</Jumbotron>
				<Jumbotron id="buttonDiv" style={{margin: '0', padding:'0 2.5rem', backgroundColor: '#D2D2D2'}}>
					<Row>			
						<Col xs={6} sm={2} md={2}>
							<Button onClick={() => console.log('create action to sort by highest amount of comments')} 
									style={{padding:'1.25rem 1.25rem', fontSize:'1.5rem'}} 
									bsStyle="link">
									Popular
							</Button>
						</Col>
						<Col xs={6} sm={1} md={1}>
							<Button onClick={() => console.log('create action to sort by recent date')} 
								style={{padding:'1.25rem 1.25rem', fontSize:'1.5rem'}} 
								bsStyle="link">
								New
							</Button>
						</Col>
						<Col xs={6} sm={1} md={1}>
							<Button onClick={() => console.log('create action to sort by oldest date')} 
								style={{padding:'1.25rem 1.25rem', fontSize:'1.5rem'}} 
								bsStyle="link">
								Old
							</Button>
						</Col>
						<Col xs={6} sm={2} md={2}>
							<Button onClick={() => console.log('create option to make new posts')} 
								style={{padding:'1.25rem 1.25rem', fontSize:'1.5rem'}} 
								bsStyle="link">
								Create New Post
							</Button>
						</Col>
					</Row>
				</Jumbotron>								
				
				<Route exact path="/" render={() => (
					<Row className="postContainer">
						<Col xs={1} md={1} className='postDiv'>
							<a className="topArrow" onClick={()=> console.log('increment voteScore by 1')}>																
								<img src={upArrowIcon} alt='Up Arrow Icon'/>
							</a> 
							<a className="downArrow" onClick={()=> console.log('decrement voteScore by 1')}>																
								<img src={downArrowIcon} alt='Down Arrow Icon'/>
							</a> 
							<span className="voteScore">3</span>
						</Col>
					</Row>						
				)}/>
				
				<Route exact path="/react" render={() => (
					<ReactPage/>		
				)}/>
				
				<Route exact path="/redux" render={() => (
					<ReduxPage/>				
				)}/>
				
				<Route exact path="/udacity" render={() => (
					<UdacityPage/>			
				)}/>				
		

														
			</div>
		);
	} 
}

function mapStateToProps({ categories, posts}) {
	return {
		categories,
		posts
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setCategory: (data) => dispatch(setCategories(data)),
		getPost: (data) => dispatch(getPosts(data))
	}
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
