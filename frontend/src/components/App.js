import React, { Component } from 'react';
import '../App.css';
import { setCategories, getPosts } from '../actions/index.js';
import { Nav, Navbar, NavItem, Jumbotron, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as ServerCall from '../utils/api.js';
import { Route, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import redditLogo from '../icons/redditLogo.svg';
import DisplayPosts from './DisplayPosts.js';
import RouteThePosts from './RouteThePosts.js';

class App extends Component {

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
	}
		
	render() {	
		const { categories, posts } = this.props;
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
				
				{/* Jumbotron that contains the logo/header */}	
				<Jumbotron id="iconHolder" style={{margin: '0', padding:'0 3rem', backgroundColor: '#A2A2A2', color:'#F2F2F2'}}>
					<Row>
						<Col xs={4} sm={2} md={2}> <img style={{margin: '1.25rem 0 0 0'}} src={redditLogo} alt="logo" /></Col>
						<Col xs={8} sm={10} md={10}><h1 style={{ fontSize: '4.45rem',textAlign:'left'}}>/R/eadit</h1></Col>
					</Row>				
				</Jumbotron>							
				
				<Route exact path="/" render={() => (
					<DisplayPosts filterWord={'none'}/>
				)}/>
				
				{/* Map thru categories in redux store to create routes. Then pass in DisplayPosts component.*/}
				{categories.map(( {name, path}, index ) => (
					<Route key ={name} exact path={`/${path}`} render={() => (
						<DisplayPosts filterWord={path}/>		
					)}/>				
				))}								

				{/* For every post found in redux store, map through it and create Routes*/}
				{posts.map( eachPost => (
					<Route 	exact path={`/${eachPost.category}/${eachPost.id}`} 
							key={eachPost.id} 
							render={() => (
						<RouteThePosts postInfo={eachPost.id} />
					)}/>
				))}
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
