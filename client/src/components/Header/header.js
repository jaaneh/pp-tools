import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/icons/Menu';
import Person from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import PartyPokerLogo from '../../images/partypoker_logo.png';

const styles = require('./styles');

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
			accOpen: false,
			isAdmin: false,
			isLoggedIn: false,
			firstLetter: ''
		};
	}

	componentWillReceiveProps() {
		const token = localStorage.getItem('token');

		if (token) {
			this.setState({ isLoggedIn: true });

			fetch('/api/v1/user', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
				.then(res => res.json())
				.then(result => {
					if (result.user) {
						const firstLetter = result.user.username.charAt(0).toUpperCase();
						this.setState({
							isAdmin: result.user.isAdmin,
							firstLetter: firstLetter
						});
					} else if (result.error.message === 'Not Authorized') {
						localStorage.removeItem('token');
						this.setState({ isLoggedIn: false });
					}
				})
				.catch(error => console.log(error));
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

	logOut = event => {
		localStorage.removeItem('token');
		this.setState({ isLoggedIn: false });
		this.handleAccClose(event);
	};

	toggleAccOpen = () => {
		this.setState({ accOpen: !this.state.accOpen });
	};

	handleAccClose = event => {
		if (this.anchorEl.contains(event.target)) {
			return;
		}

		this.setState({ accOpen: false });
	};

	render() {
		const { classes } = this.props;
		const { isLoggedIn, isAdmin, accOpen, firstLetter } = this.state;
		let userButtons, userIsAdmin;

		userIsAdmin =
			isLoggedIn && isAdmin ? (
				<Fragment>
					<Button color="inherit" href="/admin" className={classes.navButton}>
						Admin
					</Button>
				</Fragment>
			) : null;

		userButtons = isLoggedIn ? (
			<Fragment>
				<Button color="inherit" href="/dashboard" className={classes.navButton}>
					Dashboard
				</Button>
				<IconButton
					buttonRef={node => {
						this.anchorEl = node;
					}}
					aria-owns={accOpen ? 'accountMenu' : undefined}
					aria-haspopup="true"
					onClick={this.toggleAccOpen}
					className={classes.menuButton}
				>
					<Avatar style={{ color: 'white', backgroundColor: '#759ec7' }}>{firstLetter ? firstLetter : <Person />}</Avatar>
				</IconButton>
			</Fragment>
		) : (
			<Fragment>
				<Button color="inherit" href="/signup" className={classes.navButton}>
					Sign Up
				</Button>
				<Button color="inherit" href="/login" className={classes.navButton}>
					Login
				</Button>
			</Fragment>
		);

		const tabList = navConfig.map((content, i) => {
			return (
				<Button key={i} color="inherit" href={content.link} className={classes.navButton}>
					{content.text}
				</Button>
			);
		});

		const fullList = (
			<div className={classes.fullList}>
				<List component="nav">
					<ListItemLink href="/">
						<ListItemText primary="Home" />
					</ListItemLink>

					{isLoggedIn ? (
						<ListItemLink href="/admin">
							<ListItemText primary="Admin" />
						</ListItemLink>
					) : (
						<ListItemLink href="/signup">
							<ListItemText primary="Sign Up" />
						</ListItemLink>
					)}

					{isLoggedIn && isAdmin ? (
						<ListItemLink href="/dashboard">
							<ListItemText primary="Dashboard" />
						</ListItemLink>
					) : (
						<ListItemLink href="/login">
							<ListItemText primary="Login" />
						</ListItemLink>
					)}
				</List>
			</div>
		);

		const menuPopper = (
			<Popper open={accOpen} anchorEl={this.anchorEl} transition disablePortal>
				{({ TransitionProps, placement }) => (
					<Grow {...TransitionProps} id="accountMenu" style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
						<Paper>
							<ClickAwayListener onClickAway={this.handleAccClose}>
								<MenuList>
									<ListItemLink href="#">
										<ListItemText primary="My Account" />
									</ListItemLink>
									<ListItemLink href="/login" onClick={this.logOut}>
										<ListItemText primary="Log Out" />
									</ListItemLink>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		);

		return (
			<Fragment>
				<AppBar position="fixed" style={{ zIndex: 1201 }}>
					<Container>
						<Toolbar>
							<a href="/" className={classes.logoArea}>
								<img src={PartyPokerLogo} alt="partypoker diamond logo" className={classes.partypokerLogo} />
								<Typography variant="h6" color="inherit" className={classes.navTitle}>
									Tools
								</Typography>
							</a>
							<Menu onClick={this.toggleDrawer('top', true)} className={classes.MenuIcon} />
							<Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
								<div tabIndex={0} role="button" onClick={this.toggleDrawer('top', false)} onKeyDown={this.toggleDrawer('top', false)}>
									{fullList}
								</div>
							</Drawer>
							<span className={classes.navAlignment}>
								{tabList}
								{userIsAdmin}
								{userButtons}

								{menuPopper}
							</span>
						</Toolbar>
					</Container>
				</AppBar>
			</Fragment>
		);
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Header));
