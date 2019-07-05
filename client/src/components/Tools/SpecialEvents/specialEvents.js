import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';

const formFieldsConfig = require('./formFields');
const styles = require('./styles');

const helpText = {
	beforeSubmit: 'Make sure you have the correct values before submitting.'
};

const submitButton = React.forwardRef((props, ref) => <button {...props} ref={ref} type="submit" />);

class specialEvents extends Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			submitLoading: false,
			submitSuccess: false,
			disableButton: false,
			generatedURL: '',
			powerfest: 0,
			powerfestFtAmt: 0,
			powerfestBronze: false,
			powerfestSilver: false,
			powerfestTrophy: false,
			monsterseries: 0,
			monsterFtAmt: 0,
			monsterBronze: false,
			monsterSilver: false,
			monsterTrophy: false,
			koseries: 0,
			koFtAmt: 0,
			koBronze: false,
			koSilver: false,
			koTrophy: false,
			omahaseries: 0,
			omahaFtAmt: 0,
			omahaBronze: false,
			omahaSilver: false,
			omahaTrophy: false,
			millionsonline: 0,
			millionsFtAmt: 0,
			millionsBronze: false,
			millionsSilver: false,
			millionsTrophy: false
		};
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	componentDidMount() {
		const token = localStorage.getItem('token');

		fetch('/api/v1/specialEvents', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => res.json())
			.then(json => {
				if (json.success.message) {
					const values = json.success.message;

					this.setState({
						powerfest: values.powerfest || 0,
						powerfestFtAmt: values.powerfestFtAmt || 0,
						powerfestBronze: values.powerfestBronze || false,
						powerfestSilver: values.powerfestSilver || false,
						powerfestTrophy: values.powerfestTrophy || false,
						monsterseries: values.monsterseries || 0,
						monsterFtAmt: values.monsterFtAmt || 0,
						monsterBronze: values.monsterBronze || false,
						monsterSilver: values.monsterSilver || false,
						monsterTrophy: values.monsterTrophy || false,
						koseries: values.koseries || 0,
						koFtAmt: values.koFtAmt || 0,
						koBronze: values.koBronze || false,
						koSilver: values.koSilver || false,
						koTrophy: values.koTrophy || false,
						omahaseries: values.omahaseries || 0,
						omahaFtAmt: values.omahaFtAmt || 0,
						omahaBronze: values.omahaBronze || false,
						omahaSilver: values.omahaSilver || false,
						omahaTrophy: values.omahaTrophy || false,
						millionsonline: values.millionsonline || 0,
						millionsFtAmt: values.millionsFtAmt || 0,
						millionsBronze: values.millionsBronze || false,
						millionsSilver: values.millionsSilver || false,
						millionsTrophy: values.millionsTrophy || false
					});
				}
			})
			.catch(err => console.log(err));
	}

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	handleCheced = name => event => {
		this.setState({ [name]: event.target.checked });
	};

	handleSubmit = event => {
		event.preventDefault();
		let path;

		if (window.location.hostname === 'localhost') {
			path = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`;
		} else {
			path = `${window.location.protocol}//${window.location.hostname}/`;
		}

		const token = localStorage.getItem('token');

		if (!this.state.submitLoading) {
			this.setState({ disableButton: true, submitSuccess: false, submitLoading: true });
			const body = {
				powerfest: this.state.powerfest || 0,
				powerfestFtAmt: this.state.powerfestFtAmt || 0,
				powerfestBronze: this.state.powerfestBronze || false,
				powerfestSilver: this.state.powerfestSilver || false,
				powerfestTrophy: this.state.powerfestTrophy || false,
				monsterseries: this.state.monsterseries || 0,
				monsterFtAmt: this.state.monsterFtAmt || 0,
				monsterBronze: this.state.monsterBronze || false,
				monsterSilver: this.state.monsterSilver || false,
				monsterTrophy: this.state.monsterTrophy || false,
				koseries: this.state.koseries || 0,
				koFtAmt: this.state.koFtAmt || 0,
				koBronze: this.state.koBronze || false,
				koSilver: this.state.koSilver || false,
				koTrophy: this.state.koTrophy || false,
				omahaseries: this.state.omahaseries || 0,
				omahaFtAmt: this.state.omahaFtAmt || 0,
				omahaBronze: this.state.omahaBronze || false,
				omahaSilver: this.state.omahaSilver || false,
				omahaTrophy: this.state.omahaTrophy || false,
				millionsonline: this.state.millionsonline || 0,
				millionsFtAmt: this.state.millionsFtAmt || 0,
				millionsBronze: this.state.millionsBronze || false,
				millionsSilver: this.state.millionsSilver || false,
				millionsTrophy: this.state.millionsTrophy || false
			};

			fetch('/api/v1/specialEvents', {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
				.then(res => res.json())
				.then(json => {
					setTimeout(() => {
						this.setState({
							generatedURL: path + json.imgUrl,
							disableButton: false,
							submitLoading: false,
							submitSuccess: true
						});
					}, 1500);
				})
				.catch(err => console.log(err));
		}
	};

	render() {
		const { submitLoading, submitSuccess, generatedURL } = this.state;
		const { classes } = this.props;
		let imgUrl, SubmitBtnText;

		SubmitBtnText = submitLoading ? <span>Generating Image</span> : <span>Submit</span>;

		imgUrl = submitSuccess ? (
			<p className={classes.generatedURL}>
				<a href={generatedURL} target="_blank" rel="noopener noreferrer">
					{generatedURL}
				</a>
			</p>
		) : null;

		const formFields = formFieldsConfig.map((content, i) => {
			return (
				<Fragment key={i}>
					<FormControl className={classes.formControl} variant="filled">
						<h2 className={classes.tournamentTitle}>{content.name}</h2>
						<FormGroup row>
							<TextField
								id="number"
								variant="outlined"
								label="Best Placement"
								value={this.state[content.state]}
								onChange={this.handleChange(`${content.state}`)}
								type="number"
								className={classes.textField}
								margin="normal"
							/>
							<TextField
								id="number"
								variant="outlined"
								label="Final Tables"
								value={this.state[content.ftState]}
								onChange={this.handleChange(`${content.ftState}`)}
								type="number"
								className={classes.textField}
								margin="normal"
							/>
							<FormControlLabel label="Bronze" control={<Checkbox checked={this.state[content.bronzeState]} onChange={this.handleCheced(`${content.bronzeState}`)} value={this.state[content.bronzeState]} />} />
							<FormControlLabel label="Silver" control={<Checkbox checked={this.state[content.silverState]} onChange={this.handleCheced(`${content.silverState}`)} value={this.state[content.silverState]} />} />
							<FormControlLabel label="Trophy" control={<Checkbox checked={this.state[content.trophyState]} onChange={this.handleCheced(`${content.trophyState}`)} value={this.state[content.trophyState]} />} />
						</FormGroup>
					</FormControl>
					<Divider variant="fullWidth" />
				</Fragment>
			);
		});

		return (
			<div>
				<h2 className={classes.titleh2}>Special Events</h2>
				<p className={classes.underHeader}>
					Once you submit statistics to the database, an image will generate and give you the URL.
					<br />
					Your saved statistics will automatically be loaded next time you visit the page.
				</p>

				<form onSubmit={this.handleSubmit} className={classes.specialEventsForm} noValidate autoComplete="off">
					{formFields}

					<FormControl className={classNames(classes.formControl, classes.submitBtnWrapper)} variant="filled">
						<FormHelperText className={classes.helpText}>{helpText.beforeSubmit}</FormHelperText>
						<Button className={classes.submitBtn} classes={{ disabled: classes.submitDisabled }} component={submitButton} variant="contained" disabled={submitLoading}>
							{SubmitBtnText}
							{submitLoading && <CircularProgress size={38} className={classes.loadingSymbol} />}
						</Button>
					</FormControl>
					{imgUrl}
				</form>
			</div>
		);
	}
}

export default withStyles(styles)(specialEvents);
