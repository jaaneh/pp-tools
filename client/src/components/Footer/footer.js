import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const styles = require('./styles');

class Footer extends Component {
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.footer}>
				<div className={classes.inner}>
					Crafted with <FontAwesomeIcon icon={faHeart} className={classes.heartIcon} /> by Jan
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Footer);
