module.exports = theme => ({
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 160
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	submitDisabled: {
		background: '#ccc !important',
		color: '#888 !important'
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
	submitBtnWrapper: {
		display: 'flex',
		width: '50%',
		margin: '25px auto 0'
	},
	specialEventsForm: {
		flexWrap: 'wrap',
		margin: '0 auto',
		width: 650,
		position: 'absolute',
		left: '50%',
		marginLeft: -325,
		marginBottom: 150
	},
	helpText: {
		margin: '8px 12px'
	},
	titleh2: {
		textAlign: 'center'
	},
	underHeader: {
		textAlign: 'center',
		marginBottom: 20
	},
	loadingSymbol: {
		color: '#4caf50',
		position: 'absolute',
		margin: '0 auto'
	},
	generatedURL: {
		textAlign: 'center',
		paddingTop: 15
	},
	tournamentTitle: {
		fontSize: 20,
		margin: 0
	}
});
