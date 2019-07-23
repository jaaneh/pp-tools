import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

const players = require('./players');
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

const helpText = {
	chooseFile: 'Upload file',
	playerSelect: 'Whose statistics are these?'
};

const submitButton = React.forwardRef((props, ref) => <button {...props} ref={ref} type="submit" />);

class CSVTool extends Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			name: 'Name',
			player: '',
			fileName: '',
			disableButton: false,
			writeSuccess: ''
		};
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	onChange = event => {
		switch (event.target.name) {
			case 'selectedFile':
				if (event.target.files.length > 0) {
					this.setState({ fileName: event.target.files[0].name });
				}
				break;
			default:
				this.setState({ [event.target.name]: event.target.value });
		}
	};

	handleSubmit = event => {
		event.preventDefault();
		const player = this.state.player;
		const file = this.state.fileName;

		if (!player || !file) {
			this.setState({ writeSuccess: '✖ Missing player or file.', disableButton: true });
			setTimeout(() => {
				this.setState({ writeSuccess: '', disableButton: false });
			}, 1500);
		} else {
			this.setState({ disableButton: true });
			const data = new FormData(event.target);

			fetch('/api/v1/csv-submit', {
				method: 'POST',
				body: data
			})
				.then(res => res.json())
				.then(json => {
					this.setState({ writeSuccess: '✔ Google Sheet written successfully!', disableButton: true });
					setTimeout(() => {
						this.setState({ writeSuccess: '', disableButton: false });
					}, 1500);
				});
		}
	};

	render() {
		const { classes } = this.props;
		const { fileName, disableButton } = this.state;
		const submitEnable = this.state.disableButton;
		let file, playerSelect;

		playerSelect = <FormHelperText classes={{ root: classes.helperTextFix }}>{helpText.playerSelect}</FormHelperText>;
		file = fileName ? <FormHelperText classes={{ root: classes.helperTextFix }}>File selected: {fileName}</FormHelperText> : <FormHelperText>{helpText.chooseFile}</FormHelperText>;

		return (
			<section className={classes.tool}>
				<h2 className={classes.titleh2}>CSV Tool</h2>

				<form onSubmit={this.handleSubmit} className={classes.csvtool} noValidate autoComplete="off">
					<FormControl variant="filled" className={classNames(classes.formControl, classes.playerDropdown)}>
						<InputLabel htmlFor="player-select">Player</InputLabel>
						<Select value={this.state.player} onChange={this.handleChange('player')} input={<FilledInput name="Player" id="player-select" classes={{ underline: classes.formUnderline }} />}>
							{players.map(option => (
								<MenuItem key={option.value} value={option.value} className={classes.dropdown}>
									{option.label}
								</MenuItem>
							))}
						</Select>
						{playerSelect}
					</FormControl>

					<FormControl className={classes.formControl} variant="filled">
						<input accept=".csv" className={classes.input} id="csv-file" name="selectedFile" onChange={event => this.onChange(event)} multiple type="file" />
						<label htmlFor="csv-file">
							<Button variant="contained" component="span" className={classes.fileUploadBtn}>
								Upload CSV File
								<CloudUploadIcon className={classes.marginLeft} />
							</Button>
						</label>
						{file}
					</FormControl>

					<FormControl className={classes.formControl} variant="filled">
						<Button className={classes.submitBtn} classes={{ disabled: classes.submitDisabled }} component={submitButton} variant="contained" disabled={submitEnable}>
							Submit
							{disableButton && <CircularProgress size={38} className={classes.loadingSymbol} />}
						</Button>
					</FormControl>

					<FormControl className={classes.formControl} variant="filled">
						<p className={classes.writeSuccess}>{this.state.writeSuccess}</p>
					</FormControl>
				</form>
			</section>
		);
	}
}

CSVTool.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles, theme)(CSVTool);
