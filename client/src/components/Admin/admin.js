import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

import AdminTabs from './Tabs/admintabs';

const styles = require('./styles');

class Homegame extends Component {
	constructor() {
		super();
		this.state = {
			isAdmin: false
		};
	}

	componentWillMount() {
		document.title = 'partypoker Tools - Admin Panel';
	}

	render() {
		const { classes } = this.props;

		return (
			<section className={classes.main}>
				<AdminTabs />
			</section>
		);
	}
}

export default withStyles(styles)(Homegame);
