import React, { Component } from 'react';
import '../App.css';
import { setCategories, getPosts } from '../actions/index.js';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as ServerCall from '../utils/api.js'
import { Route, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
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
				<header>
					<Navbar bsStyle='default' fixedTop={true} fluid={true}>
						<Navbar.Header style={{ margin: '1.5rem'}}>
							My Subscriptions: 
						</Navbar.Header>
						<Nav bsStyle="tabs">
							{/* Map over this.props.categories to make nav links and route. 
								Allow routing for these Nav Items */}
								<LinkContainer exact={true} to="/">
									<NavItem>All</NavItem>
								</LinkContainer>
							{categories.map(( {name, path}, index ) => (
								<LinkContainer key={name} to={`/${path}`}>
									<NavItem>{name}</NavItem>	
								</LinkContainer>
							))}
						</Nav>
					</Navbar>
				</header>
				
				<Route exact path="/" render={() => (
					<div style={{ margin: '8rem'}}>This is the home page</div>							
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
