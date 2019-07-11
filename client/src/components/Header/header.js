import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import PartyPokerLogo from '../../images/partypoker_logo.png';
import '../../App.css';
import './header.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';

const navConfig = [
	{
		text: 'Home',
		link: '/'
	}
];

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

class Header extends Component {
	constructor() {
		super();
		this.logOut = this.logOut.bind(this);
		this.state = {
			top: false,
			open: false,
			isLoggedIn: false
		};
	}

	componentWillReceiveProps() {
		const token = localStorage.getItem('token');
		if (token) {
			this.setState({ isLoggedIn: true });
		} else {
			localStorage.removeItem('token');
			this.setState({ isLoggedIn: false });
		}
	}

	handleChange = (event, value) => {
		this.setState({ tabValue: value });
	};

	toggleDrawer = (side, open) => () => {
		this.setState({
			[side]: open
		});
	};

	logOut() {
		localStorage.removeItem('token');
		this.setState({ isLoggedIn: false });
	}

	render() {
		const { isLoggedIn } = this.state;
		let userButtons;

		userButtons = isLoggedIn ? (
			<Fragment>
				<Button color="inherit" href="/dashboard" classes={{ root: 'navButton' }}>
					Dashboard
				</Button>
				<Button color="inherit" href="/" onClick={this.logOut} classes={{ root: 'navButton' }}>
					Log Out
				</Button>
			</Fragment>
		) : (
			<Fragment>
				<Button color="inherit" href="/signup" classes={{ root: 'navButton' }}>
					Sign Up
				</Button>
				<Button color="inherit" href="/login" classes={{ root: 'navButton' }}>
					Login
				</Button>
			</Fragment>
		);

		const tabList = navConfig.map((content, i) => {
			return (
				<Button key={i} color="inherit" href={content.link} classes={{ root: 'navButton' }}>
					{content.text}
				</Button>
			);
		});

		const fullList = (
			<div className="fullList">
				<List component="nav">
					<ListItemLink href="/">
						<ListItemText primary="Home" />
					</ListItemLink>
					<ListItemLink href="/signup">
						<ListItemText primary="Sign Up" />
					</ListItemLink>
					<ListItemLink href="/login">
						<ListItemText primary="Login" />
					</ListItemLink>
				</List>
			</div>
		);

		return (
			<Fragment>
				<AppBar position="fixed">
					<Container>
						<Toolbar>
							<a href="/" className="logoArea">
								<img src={PartyPokerLogo} alt="partypoker diamond logo" className="partypokerLogo" />
								<Typography variant="h6" color="inherit" className="navTitle">
									Tools
								</Typography>
							</a>
							<Menu onClick={this.toggleDrawer('top', true)} className="MenuIcon" />
							<Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
								<div tabIndex={0} role="button" onClick={this.toggleDrawer('top', false)} onKeyDown={this.toggleDrawer('top', false)}>
									{fullList}
								</div>
							</Drawer>
							<span className="navAlignment">
								{tabList}
								{userButtons}
							</span>
						</Toolbar>
					</Container>
				</AppBar>
			</Fragment>
		);
	}
}

export default withRouter(Header);
