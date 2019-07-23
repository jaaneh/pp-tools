import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';

import DashboardTabs from './Tabs/tabs';

const styles = require('./styles');

const theme = createMuiTheme({
	overrides: {
		MuiFilledInput: {
			'&$focused': {
				color: '#171521'
			}
		},
		MuiInputBase: {
			root: {
				color: '#ffffff'
			}
		}
	}
});

const capitalize = s => {
	if (typeof s !== 'string') return '';
	return s.charAt(0).toUpperCase() + s.slice(1);
};

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			user: null
		};
	}

	componentWillMount() {
		document.title = 'partypoker Tools - Dashboard';
	}

	componentDidMount() {
		const token = localStorage.getItem('token');

		if (!token) {
			this.props.history.push('/login');
		} else {
			fetch('/api/v1/user', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
				.then(res => res.json())
				.then(result => {
					if (result.user) {
						this.setState({
							user: result.user
						});
					} else {
						localStorage.removeItem('token');
						this.props.history.push('/login');
					}
				})
				.catch(error => console.log(error));
		}
	}

	render() {
		const { classes } = this.props;
		const { user } = this.state;
		let greeting;

		greeting = user ? <p className={classes.greeting}>Hello, {capitalize(user.username)}!</p> : null;

		return (
			<section className={classes.main}>
				<DashboardTabs greeting={greeting} />
			</section>
		);
	}
}

export default withRouter(withStyles(styles, theme)(Dashboard));
