module.exports = theme => ({
	root: {
		flexGrow: 1
	},
	toolBar: {
		backgroundColor: 'inherit',
		color: 'inherit'
	},
	tab: {
		'&:hover': {
			opacity: '1'
		}
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	drawer: {
		width: 240,
		flexShrink: 0
	},
	drawerPaper: {
		width: 240
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	toolbar: theme.mixins.toolbar
});
