import React, { Component } from 'react';
import '../App.css';
import {Nav, Navbar, NavItem } from 'react-bootstrap';

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
		//window.addEventListener('resize', this.getDimensions);
	}
	
	componentWillUnmount() {	
		//window.removeEventListener('resize', this.getDimensions);
	}	
	
	
	
	render() {
		const { windowWidth } = this.state;
		
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

export default App;
