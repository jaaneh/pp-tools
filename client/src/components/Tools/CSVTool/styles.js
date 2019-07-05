module.exports = theme => ({
	marginLeft: {
		marginLeft: theme.spacing(1)
	},
	tool: {
		width: '100%',
		color: '#000'
	},
	titleh2: {
		textAlign: 'center'
	},
	csvtool: {
		display: 'inline-grid',
		flexWrap: 'wrap',
		margin: '0 auto',
		width: 300,
		position: 'absolute',
		left: '50%',
		marginLeft: -150
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	dropdown: {
		height: 20
	},
	input: {
		display: 'none'
	},
	fileUploadBtn: {
		width: '100%',
		background: 'linear-gradient(45deg, #5780bb 30%, #62a7c7 90%);',
		color: 'white',
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .2)',
		padding: '16px 25px',
		'&:hover': {
			boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .4)'
		}
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
		maxWidth: '160px',
		color: 'rgba(0, 0, 0, 0.54)',
		fontSize: '0.75rem',
		textAlign: 'left',
		minHeight: '1em',
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		lineHeight: '1em'
	},
	buttonWrapper: {
		margin: 8
	},
	formUnderline: {
		'&:after': {
			borderBottom: '2px solid #171521'
		}
	},
	writeSuccess: {
		fontSize: 16
	},
	helperTextFix: {
		maxWidth: 284,
		wordWrap: 'break-word'
	},
	loadingSymbol: {
		color: '#4caf50',
		position: 'absolute',
		margin: '0 auto'
	}
});
