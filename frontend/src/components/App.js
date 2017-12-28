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
	
	componentDidMount() {	
		this.setState({ selected: 1 })
		//set category state in redux store to values found in server
		ServerCall.getCategories().then((data) => {
			data.categories.forEach( category => {
				this.props.setCategory(category);
			})
		})
		//window.addEventListener('resize', this.getDimensions);
	}
	
	componentWillUnmount() {	
		//window.removeEventListener('resize', this.getDimensions);
	}	
	
	
	
	render() {
		const { windowWidth } = this.state;
		console.log(this.props)
		return (
			<div className="App">			
				<header>
					<Navbar bsStyle='default' fixedTop={true} fluid={true}>
						<Navbar.Header style={{ margin: '1.5rem'}}>
							My Subscriptions: 
						</Navbar.Header>
						<Nav bsStyle="tabs" activeKey={this.state.selected} onSelect={ (selectedKey) => this.setState({ selected: selectedKey }) }>
							<NavItem eventKey={1} href="/home">All</NavItem>
							<NavItem eventKey={2} href="#">React</NavItem>
							<NavItem eventKey={3} href="#">Redux</NavItem>
							<NavItem eventKey={4} href="#">Udacity</NavItem>
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

function mapStateToProps(category) {
	return {
		category
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setCategory: (data) => dispatch(setCategories(data))		
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
