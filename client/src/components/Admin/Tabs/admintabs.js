import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Users from '../Tools/Users/users';

const styles = require('./styles');

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 16 }}>
			{props.children}
		</Typography>
	);
}

class AdminTabs extends Component {
	constructor() {
		super();
		this.state = {
			value: 0
		};
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes } = this.props;
		const { value } = this.state;

		return (
			<div className={classes.root}>
				<AppBar position="static" className={classes.toolBar}>
					<Tabs value={value} onChange={this.handleChange} TabIndicatorProps={{ style: { backgroundColor: '#171521' } }} centered>
						<Tab className={classes.tab} label="Users" />
					</Tabs>
				</AppBar>
				<Container>
					{value === 0 && (
						<TabContainer>
							<Users />
						</TabContainer>
					)}
				</Container>
			</div>
		);
	}
}

AdminTabs.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(AdminTabs));
