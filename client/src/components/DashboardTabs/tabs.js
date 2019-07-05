import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import CSVTool from '../Tools/CSVTool/csvtool';
import SpecialEvents from '../Tools/SpecialEvents/specialEvents';
import Achievements from '../Tools/Achievements/achievements';
import Knockouts from '../Tools/Knockouts/knockouts';
import HomeGame from '../Tools/HomeGame/homegame';

const styles = require('./styles');

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 16 }}>
			{props.children}
		</Typography>
	);
}

class DashboardTabs extends Component {
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
						<Tab className={classes.tab} label="Home" />
						<Tab className={classes.tab} label="CSV Tool" />
						<Tab className={classes.tab} label="Special Events" />
						<Tab className={classes.tab} label="Knockouts" />
						<Tab className={classes.tab} label="Achievements" />
						<Tab className={classes.tab} label="Home Games" />
					</Tabs>
				</AppBar>
				<Container>
					{value === 0 && <TabContainer>{this.props.greeting}</TabContainer>}
					{value === 1 && (
						<TabContainer>
							<CSVTool />
						</TabContainer>
					)}
					{value === 2 && (
						<TabContainer>
							<SpecialEvents />
						</TabContainer>
					)}
					{value === 3 && (
						<TabContainer>
							<Knockouts />
						</TabContainer>
					)}
					{value === 4 && (
						<TabContainer>
							<Achievements />
						</TabContainer>
					)}
					{value === 5 && (
						<TabContainer>
							<HomeGame />
						</TabContainer>
					)}
				</Container>
			</div>
		);
	}
}

DashboardTabs.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashboardTabs);
