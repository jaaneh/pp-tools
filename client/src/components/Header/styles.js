module.exports = theme => ({
	list: {
		width: 250
	},
	fullList: {
		width: 'auto'
	},
	navAlignment: {
		marginLeft: 'auto',
		marginRight: -12
	},
	rightBtns: {
		fontSize: 12
	},
	centeredBtns: {
		fontSize: 12
	},
	navButton: {
		display: 'inline-block',
		padding: '6px 18px',
		opacity: 0.75,
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		},
		'&:hover': {
			opacity: 1
		}
	},
	menuButton: {
		color: 'inherit',
		padding: 8,
		opacity: 0.9,
		'&:hover': {
			opacity: 1
		}
	},
	partypokerLogo: {
		width: 30,
		paddingRight: 15
	},
	logoArea: {
		textDecoration: 'none',
		display: 'contents',
		color: 'inherit',
		fontWeight: 'inherit'
	},
	MenuIcon: {
		display: 'none',
		[theme.breakpoints.down('xs')]: {
			display: 'inline-block',
			opacity: 0.85,
			fontSize: 28,
			'&:hover': {
				opacity: 1
			}
		}
	},
	navTitle: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	}
});
