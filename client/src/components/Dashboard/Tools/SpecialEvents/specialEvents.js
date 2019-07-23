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
			specialEvent: {
				powerfest: 0,
				powerfestFtAmt: 0,
				powerfestBronze: false,
				powerfestSilver: false,
				powerfestTrophy: false,
				powerfestBronzeAmt: 1,
				powerfestSilverAmt: 1,
				powerfestTrophyAmt: 1,
				monsterseries: 0,
				monsterFtAmt: 0,
				monsterBronze: false,
				monsterSilver: false,
				monsterTrophy: false,
				monsterBronzeAmt: 1,
				monsterSilverAmt: 1,
				monsterTrophyAmt: 1,
				koseries: 0,
				koFtAmt: 0,
				koBronze: false,
				koSilver: false,
				koTrophy: false,
				koBronzeAmt: 1,
				koSilverAmt: 1,
				koTrophyAmt: 1,
				omahaseries: 0,
				omahaFtAmt: 0,
				omahaBronze: false,
				omahaSilver: false,
				omahaTrophy: false,
				omahaBronzeAmt: 1,
				omahaSilverAmt: 1,
				omahaTrophyAmt: 1,
				millionsonline: 0,
				millionsFtAmt: 0,
				millionsBronze: false,
				millionsSilver: false,
				millionsTrophy: false,
				millionsBronzeAmt: 1,
				millionsSilverAmt: 1,
				millionsTrophyAmt: 1
			}
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
					const values = json.success.message.specialEvent;
					this.setState({ ...this.state, specialEvent: values });
				}
			})
			.catch(err => console.log(err));
	}

	handleChange = name => event => {
		this.setState({ specialEvent: { ...this.state.specialEvent, [name]: event.target.value } });
	};

	handleChecked = name => event => {
		this.setState({ specialEvent: { ...this.state.specialEvent, [name]: event.target.checked } });
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
			const body = this.state;

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
								value={this.state.specialEvent[content.state]}
								onChange={this.handleChange(`${content.state}`)}
								type="number"
								className={classes.textField}
								margin="normal"
							/>
							<TextField
								id="number"
								variant="outlined"
								label="Final Tables"
								value={this.state.specialEvent[content.ftState]}
								onChange={this.handleChange(`${content.ftState}`)}
								type="number"
								className={classes.textField}
								margin="normal"
							/>
							<div>
								<FormControlLabel
									label="Bronze"
									control={<Checkbox checked={this.state.specialEvent[content.bronzeState]} onChange={this.handleChecked(`${content.bronzeState}`)} value={this.state.specialEvent[content.bronzeState]} />}
								/>
								{this.state.specialEvent[content.bronzeState] ? (
									<TextField
										id="number"
										variant="outlined"
										label="Amount"
										value={this.state.specialEvent[content.bronzeStateAmt]}
										onChange={this.handleChange(`${content.bronzeStateAmt}`)}
										type="number"
										className={classes.textFieldAmt}
										margin="dense"
										inputProps={{ 'aria-label': 'bare' }}
									/>
								) : null}
							</div>

							<div>
								<FormControlLabel
									label="Silver"
									control={<Checkbox checked={this.state.specialEvent[content.silverState]} onChange={this.handleChecked(`${content.silverState}`)} value={this.state.specialEvent[content.silverState]} />}
								/>
								{this.state.specialEvent[content.silverState] ? (
									<TextField
										id="number"
										variant="outlined"
										label="Amount"
										value={this.state.specialEvent[content.silverStateAmt]}
										onChange={this.handleChange(`${content.silverStateAmt}`)}
										type="number"
										className={classes.textFieldAmt}
										margin="dense"
										inputProps={{ 'aria-label': 'bare' }}
									/>
								) : null}
							</div>

							<div>
								<FormControlLabel
									label="Trophy"
									control={<Checkbox checked={this.state.specialEvent[content.trophyState]} onChange={this.handleChecked(`${content.trophyState}`)} value={this.state.specialEvent[content.trophyState]} />}
								/>
								{this.state.specialEvent[content.trophyState] ? (
									<TextField
										id="number"
										variant="outlined"
										label="Amount"
										value={this.state.specialEvent[content.trophyStateAmt]}
										onChange={this.handleChange(`${content.trophyStateAmt}`)}
										type="number"
										className={classes.textFieldAmt}
										margin="dense"
										inputProps={{ 'aria-label': 'bare' }}
									/>
								) : null}
							</div>
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
