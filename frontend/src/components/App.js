import React, { Component } from 'react';
import '../App.css';
import { setCategories, getPosts } from '../actions/index.js';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as ServerCall from '../utils/api.js'

class App extends Component {
	state = {
		windowWidth: '',
		selected: ''
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
		this.setState({ selected: 1 })
		//set states for category and posts in redux store to values found in server
		this.getCategories();
		this.getPosts();
		//window.addEventListener('resize', this.getDimensions);
	}
	
	componentWillUnmount() {	
		//window.removeEventListener('resize', this.getDimensions);
	}	
	
	
	
	render() {
		const { windowWidth } = this.state;
		const { categories } = this.props;
		console.log(this.props)
		return (
			<div className="App">			
				<header>
					<Navbar bsStyle='default' fixedTop={true} fluid={true}>
						<Navbar.Header style={{ margin: '1.5rem'}}>
							My Subscriptions: 
						</Navbar.Header>
						<Nav bsStyle="tabs" activeKey={this.state.selected} onSelect={ (selectedKey) => this.setState({ selected: selectedKey }) }>
							{/* Map over this.props.categories to make nav links and route. */}
							<NavItem eventKey={1} href="/home">All</NavItem>
							{categories.map(( {name}, index ) => (
								<NavItem key={name} eventKey={index+2} href="#">{name}</NavItem>					
							))}
						</Nav>
					</Navbar>
				</header>		

			{ /* Responsive Web Design via JS */}
			{/*	windowWidth < 768 && (
				<MobileView />
			
			)}			
			{	windowWidth  >= 768 &&  windowWidth  <= 1024 && (
				<TabletView />			
			)}
			{	windowWidth  > 1024 && (
				<DesktopView />			
			)*/}			
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


export default connect(mapStateToProps, mapDispatchToProps)(App);
