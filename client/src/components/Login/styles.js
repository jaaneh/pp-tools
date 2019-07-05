module.exports = theme => ({
	main: {
		paddingTop: '65px',
		width: '100%',
		color: '#000'
	},
	titleh2: {
		textAlign: 'center'
	},
	marginLeft: {
		marginLeft: theme.spacing(1)
	},
	loginForm: {
		display: 'inline-grid',
		flexWrap: 'wrap',
		margin: '0 auto',
		width: '300px',
		position: 'absolute',
		left: '50%',
		marginLeft: '-150px'
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	submitBtn: {
		background: 'linear-gradient(45deg, #A94258 30%, #C16D42 90%)',
		color: 'white',
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .2)',
		padding: '16px 32px',
		'&:hover': {
			boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .4)'
		}
	},
	submitDisabled: {
		background: '#ccc !important',
		color: '#888 !important'
	},
	helpText: {
		margin: '8px 12px 0',
		color: 'rgba(0, 0, 0, 0.54)',
		fontSize: '0.75rem',
		textAlign: 'left',
		minHeight: '1em',
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		lineHeight: '1em'
	},
	errorMessage: {
		fontSize: '16px'
	},
	loadingSymbol: {
		color: '#4caf50',
		position: 'absolute',
		margin: '0 auto'
	}
});
