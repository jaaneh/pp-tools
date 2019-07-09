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

class Achievements extends Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			submitLoading: false,
			submitSuccess: false,
			disableButton: false,
			generatedURL: '',
			terminator530: 0,
			terminator530FtAmt: 0,
			terminator530Bronze: false,
			terminator530Silver: false,
			terminator530Trophy: false,
			terminator530BronzeAmt: 1,
			terminator530SilverAmt: 1,
			terminator530TrophyAmt: 1,
			deepstack215: 0,
			deepstack215FtAmt: 0,
			deepstack215Bronze: false,
			deepstack215Silver: false,
			deepstack215Trophy: false,
			deepstack215BronzeAmt: 1,
			deepstack215SilverAmt: 1,
			deepstack215TrophyAmt: 1,
			gladiator320: 0,
			gladiator320FtAmt: 0,
			gladiator320Bronze: false,
			gladiator320Silver: false,
			gladiator320Trophy: false,
			gladiator320BronzeAmt: 1,
			gladiator320SilverAmt: 1,
			gladiator320TrophyAmt: 1,
			mmbounty215: 0,
			mmbounty215FtAmt: 0,
			mmbounty215Bronze: false,
			mmbounty215Silver: false,
			mmbounty215Trophy: false,
			mmbounty215BronzeAmt: 1,
			mmbounty215SilverAmt: 1,
			mmbounty215TrophyAmt: 1,
			clasico530: 0,
			clasico530FtAmt: 0,
			clasico530Bronze: false,
			clasico530Silver: false,
			clasico530Trophy: false,
			clasico530BronzeAmt: 1,
			clasico530SilverAmt: 1,
			clasico530TrophyAmt: 1,
			warmup82: 0,
			warmup82FtAmt: 0,
			warmup82Bronze: false,
			warmup82Silver: false,
			warmup82Trophy: false,
			warmup82BronzeAmt: 1,
			warmup82SilverAmt: 1,
			warmup82TrophyAmt: 1,
			dailygrind109: 0,
			dailygrind109FtAmt: 0,
			dailygrind109Bronze: false,
			dailygrind109Silver: false,
			dailygrind109Trophy: false,
			dailygrind109BronzeAmt: 1,
			dailygrind109SilverAmt: 1,
			dailygrind109TrophyAmt: 1,
			terminator109: 0,
			terminator109FtAmt: 0,
			terminator109Bronze: false,
			terminator109Silver: false,
			terminator109Trophy: false,
			terminator109BronzeAmt: 1,
			terminator109SilverAmt: 1,
			terminator109TrophyAmt: 1,
			deepstack55: 0,
			deepstack55FtAmt: 0,
			deepstack55Bronze: false,
			deepstack55Silver: false,
			deepstack55Trophy: false,
			deepstack55BronzeAmt: 1,
			deepstack55SilverAmt: 1,
			deepstack55TrophyAmt: 1,
			gladiator55: 0,
			gladiator55FtAmt: 0,
			gladiator55Bronze: false,
			gladiator55Silver: false,
			gladiator55Trophy: false,
			gladiator55BronzeAmt: 1,
			gladiator55SilverAmt: 1,
			gladiator55TrophyAmt: 1,
			mmbounty55: 0,
			mmbounty55FtAmt: 0,
			mmbounty55Bronze: false,
			mmbounty55Silver: false,
			mmbounty55Trophy: false,
			mmbounty55BronzeAmt: 1,
			mmbounty55SilverAmt: 1,
			mmbounty55TrophyAmt: 1,
			clasico109: 0,
			clasico109FtAmt: 0,
			clasico109Bronze: false,
			clasico109Silver: false,
			clasico109Trophy: false,
			clasico109BronzeAmt: 1,
			clasico109SilverAmt: 1,
			clasico109TrophyAmt: 1,
			warmup22: 0,
			warmup22FtAmt: 0,
			warmup22Bronze: false,
			warmup22Silver: false,
			warmup22Trophy: false,
			warmup22BronzeAmt: 1,
			warmup22SilverAmt: 1,
			warmup22TrophyAmt: 1,
			dailygrind33: 0,
			dailygrind33FtAmt: 0,
			dailygrind33Bronze: false,
			dailygrind33Silver: false,
			dailygrind33Trophy: false,
			dailygrind33BronzeAmt: 1,
			dailygrind33SilverAmt: 1,
			dailygrind33TrophyAmt: 1,
			terminator33: 0,
			terminator33FtAmt: 0,
			terminator33Bronze: false,
			terminator33Silver: false,
			terminator33Trophy: false,
			terminator33BronzeAmt: 1,
			terminator33SilverAmt: 1,
			terminator33TrophyAmt: 1,
			deepstack11: 0,
			deepstack11FtAmt: 0,
			deepstack11Bronze: false,
			deepstack11Silver: false,
			deepstack11Trophy: false,
			deepstack11BronzeAmt: 1,
			deepstack11SilverAmt: 1,
			deepstack11TrophyAmt: 1,
			gladiator11: 0,
			gladiator11FtAmt: 0,
			gladiator11Bronze: false,
			gladiator11Silver: false,
			gladiator11Trophy: false,
			gladiator11BronzeAmt: 1,
			gladiator11SilverAmt: 1,
			gladiator11TrophyAmt: 1,
			mmbounty11: 0,
			mmbounty11FtAmt: 0,
			mmbounty11Bronze: false,
			mmbounty11Silver: false,
			mmbounty11Trophy: false,
			mmbounty11BronzeAmt: 1,
			mmbounty11SilverAmt: 1,
			mmbounty11TrophyAmt: 1,
			clasico33: 0,
			clasico33FtAmt: 0,
			clasico33Bronze: false,
			clasico33Silver: false,
			clasico33Trophy: false,
			clasico33BronzeAmt: 1,
			clasico33SilverAmt: 1,
			clasico33TrophyAmt: 1
		};
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	componentDidMount() {
		const token = localStorage.getItem('token');

		fetch('/api/v1/achievements', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => res.json())
			.then(json => {
				if (json.success.message) {
					const values = json.success.message;

					this.setState({
						terminator530: values.terminator530 || 0,
						terminator530FtAmt: values.terminator530FtAmt || 0,
						terminator530Bronze: values.terminator530Bronze || false,
						terminator530Silver: values.terminator530Silver || false,
						terminator530Trophy: values.terminator530Trophy || false,
						terminator530BronzeAmt: values.terminator530BronzeAmt || 1,
						terminator530SilverAmt: values.terminator530SilverAmt || 1,
						terminator530TrophyAmt: values.terminator530TrophyAmt || 1,
						deepstack215: values.deepstack215 || 0,
						deepstack215FtAmt: values.deepstack215FtAmt || 0,
						deepstack215Bronze: values.deepstack215Bronze || false,
						deepstack215Silver: values.deepstack215Silver || false,
						deepstack215Trophy: values.deepstack215Trophy || false,
						deepstack215BronzeAmt: values.deepstack215BronzeAmt || 1,
						deepstack215SilverAmt: values.deepstack215SilverAmt || 1,
						deepstack215TrophyAmt: values.deepstack215TrophyAmt || 1,
						gladiator320: values.gladiator320 || 0,
						gladiator320FtAmt: values.gladiator320FtAmt || 0,
						gladiator320Bronze: values.gladiator320Bronze || false,
						gladiator320Silver: values.gladiator320Silver || false,
						gladiator320Trophy: values.gladiator320Trophy || false,
						gladiator320BronzeAmt: values.gladiator320BronzeAmt || 1,
						gladiator320SilverAmt: values.gladiator320SilverAmt || 1,
						gladiator320TrophyAmt: values.gladiator320TrophyAmt || 1,
						mmbounty215: values.mmbounty215 || 0,
						mmbounty215FtAmt: values.mmbounty215FtAmt || 0,
						mmbounty215Bronze: values.mmbounty215Bronze || false,
						mmbounty215Silver: values.mmbounty215Silver || false,
						mmbounty215Trophy: values.mmbounty215Trophy || false,
						mmbounty215BronzeAmt: values.mmbounty215BronzeAmt || 1,
						mmbounty215SilverAmt: values.mmbounty215SilverAmt || 1,
						mmbounty215TrophyAmt: values.mmbounty215TrophyAmt || 1,
						clasico530: values.clasico530 || 0,
						clasico530FtAmt: values.clasico530FtAmt || 0,
						clasico530Bronze: values.clasico530Bronze || false,
						clasico530Silver: values.clasico530Silver || false,
						clasico530Trophy: values.clasico530Trophy || false,
						clasico530BronzeAmt: values.clasico530BronzeAmt || 1,
						clasico530SilverAmt: values.clasico530SilverAmt || 1,
						clasico530TrophyAmt: values.clasico530TrophyAmt || 1,
						warmup82: values.warmup82 || 0,
						warmup82FtAmt: values.warmup82FtAmt || 0,
						warmup82Bronze: values.warmup82Bronze || false,
						warmup82Silver: values.warmup82Silver || false,
						warmup82Trophy: values.warmup82Trophy || false,
						warmup82BronzeAmt: values.warmup82BronzeAmt || 1,
						warmup82SilverAmt: values.warmup82SilverAmt || 1,
						warmup82TrophyAmt: values.warmup82TrophyAmt || 1,
						dailygrind109: values.dailygrind109 || 0,
						dailygrind109FtAmt: values.dailygrind109FtAmt || 0,
						dailygrind109Bronze: values.dailygrind109Bronze || false,
						dailygrind109Silver: values.dailygrind109Silver || false,
						dailygrind109Trophy: values.dailygrind109Trophy || false,
						dailygrind109BronzeAmt: values.dailygrind109BronzeAmt || 1,
						dailygrind109SilverAmt: values.dailygrind109SilverAmt || 1,
						dailygrind109TrophyAmt: values.dailygrind109TrophyAmt || 1,
						terminator109: values.terminator109 || 0,
						terminator109FtAmt: values.terminator109FtAmt || 0,
						terminator109Bronze: values.terminator109Bronze || false,
						terminator109Silver: values.terminator109Silver || false,
						terminator109Trophy: values.terminator109Trophy || false,
						terminator109BronzeAmt: values.terminator109BronzeAmt || 1,
						terminator109SilverAmt: values.terminator109SilverAmt || 1,
						terminator109TrophyAmt: values.terminator109TrophyAmt || 1,
						deepstack55: values.deepstack55 || 0,
						deepstack55FtAmt: values.deepstack55FtAmt || 0,
						deepstack55Bronze: values.deepstack55Bronze || false,
						deepstack55Silver: values.deepstack55Silver || false,
						deepstack55Trophy: values.deepstack55Trophy || false,
						deepstack55BronzeAmt: values.deepstack55BronzeAmt || 1,
						deepstack55SilverAmt: values.deepstack55SilverAmt || 1,
						deepstack55TrophyAmt: values.deepstack55TrophyAmt || 1,
						gladiator55: values.gladiator55 || 0,
						gladiator55FtAmt: values.gladiator55FtAmt || 0,
						gladiator55Bronze: values.gladiator55Bronze || false,
						gladiator55Silver: values.gladiator55Silver || false,
						gladiator55Trophy: values.gladiator55Trophy || false,
						gladiator55BronzeAmt: values.gladiator55BronzeAmt || 1,
						gladiator55SilverAmt: values.gladiator55SilverAmt || 1,
						gladiator55TrophyAmt: values.gladiator55TrophyAmt || 1,
						mmbounty55: values.mmbounty55 || 0,
						mmbounty55FtAmt: values.mmbounty55FtAmt || 0,
						mmbounty55Bronze: values.mmbounty55Bronze || false,
						mmbounty55Silver: values.mmbounty55Silver || false,
						mmbounty55Trophy: values.mmbounty55Trophy || false,
						mmbounty55BronzeAmt: values.mmbounty55BronzeAmt || 1,
						mmbounty55SilverAmt: values.mmbounty55SilverAmt || 1,
						mmbounty55TrophyAmt: values.mmbounty55TrophyAmt || 1,
						clasico109: values.clasico109 || 0,
						clasico109FtAmt: values.clasico109FtAmt || 0,
						clasico109Bronze: values.clasico109Bronze || false,
						clasico109Silver: values.clasico109Silver || false,
						clasico109Trophy: values.clasico109Trophy || false,
						clasico109BronzeAmt: values.clasico109BronzeAmt || 1,
						clasico109SilverAmt: values.clasico109SilverAmt || 1,
						clasico109TrophyAmt: values.clasico109TrophyAmt || 1,
						warmup22: values.warmup22 || 0,
						warmup22FtAmt: values.warmup22FtAmt || 0,
						warmup22Bronze: values.warmup22Bronze || false,
						warmup22Silver: values.warmup22Silver || false,
						warmup22Trophy: values.warmup22Trophy || false,
						warmup22BronzeAmt: values.warmup22BronzeAmt || 1,
						warmup22SilverAmt: values.warmup22SilverAmt || 1,
						warmup22TrophyAmt: values.warmup22TrophyAmt || 1,
						dailygrind33: values.dailygrind33 || 0,
						dailygrind33FtAmt: values.dailygrind33FtAmt || 0,
						dailygrind33Bronze: values.dailygrind33Bronze || false,
						dailygrind33Silver: values.dailygrind33Silver || false,
						dailygrind33Trophy: values.dailygrind33Trophy || false,
						dailygrind33BronzeAmt: values.dailygrind33BronzeAmt || 1,
						dailygrind33SilverAmt: values.dailygrind33SilverAmt || 1,
						dailygrind33TrophyAmt: values.dailygrind33TrophyAmt || 1,
						terminator33: values.terminator33 || 0,
						terminator33FtAmt: values.terminator33FtAmt || 0,
						terminator33Bronze: values.terminator33Bronze || false,
						terminator33Silver: values.terminator33Silver || false,
						terminator33Trophy: values.terminator33Trophy || false,
						terminator33BronzeAmt: values.terminator33BronzeAmt || 1,
						terminator33SilverAmt: values.terminator33SilverAmt || 1,
						terminator33TrophyAmt: values.terminator33TrophyAmt || 1,
						deepstack11: values.deepstack11 || 0,
						deepstack11FtAmt: values.deepstack11FtAmt || 0,
						deepstack11Bronze: values.deepstack11Bronze || false,
						deepstack11Silver: values.deepstack11Silver || false,
						deepstack11Trophy: values.deepstack11Trophy || false,
						deepstack11BronzeAmt: values.deepstack11BronzeAmt || 1,
						deepstack11SilverAmt: values.deepstack11SilverAmt || 1,
						deepstack11TrophyAmt: values.deepstack11TrophyAmt || 1,
						gladiator11: values.gladiator11 || 0,
						gladiator11FtAmt: values.gladiator11FtAmt || 0,
						gladiator11Bronze: values.gladiator11Bronze || false,
						gladiator11Silver: values.gladiator11Silver || false,
						gladiator11Trophy: values.gladiator11Trophy || false,
						gladiator11BronzeAmt: values.gladiator11BronzeAmt || 1,
						gladiator11SilverAmt: values.gladiator11SilverAmt || 1,
						gladiator11TrophyAmt: values.gladiator11TrophyAmt || 1,
						mmbounty11: values.mmbounty11 || 0,
						mmbounty11FtAmt: values.mmbounty11FtAmt || 0,
						mmbounty11Bronze: values.mmbounty11Bronze || false,
						mmbounty11Silver: values.mmbounty11Silver || false,
						mmbounty11Trophy: values.mmbounty11Trophy || false,
						mmbounty11BronzeAmt: values.mmbounty11BronzeAmt || 1,
						mmbounty11SilverAmt: values.mmbounty11SilverAmt || 1,
						mmbounty11TrophyAmt: values.mmbounty11TrophyAmt || 1,
						clasico33: values.clasico33 || 0,
						clasico33FtAmt: values.clasico33FtAmt || 0,
						clasico33Bronze: values.clasico33Bronze || false,
						clasico33Silver: values.clasico33Silver || false,
						clasico33Trophy: values.clasico33Trophy || false,
						clasico33BronzeAmt: values.clasico33BronzeAmt || 1,
						clasico33SilverAmt: values.clasico33SilverAmt || 1,
						clasico33TrophyAmt: values.clasico33TrophyAmt || 1
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
			const body = this.state;

			fetch('/api/v1/achievements', {
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

							<div>
								<FormControlLabel label="Bronze" control={<Checkbox checked={this.state[content.bronzeState]} onChange={this.handleCheced(`${content.bronzeState}`)} value={this.state[content.bronzeState]} />} />
								{this.state[content.bronzeState] ? (
									<TextField
										id="number"
										variant="outlined"
										label="Amount"
										value={this.state[content.bronzeStateAmt]}
										onChange={this.handleChange(`${content.bronzeStateAmt}`)}
										type="number"
										className={classes.textFieldAmt}
										margin="dense"
										inputProps={{ 'aria-label': 'bare' }}
									/>
								) : null}
							</div>

							<div>
								<FormControlLabel label="Silver" control={<Checkbox checked={this.state[content.silverState]} onChange={this.handleCheced(`${content.silverState}`)} value={this.state[content.silverState]} />} />
								{this.state[content.silverState] ? (
									<TextField
										id="number"
										variant="outlined"
										label="Amount"
										value={this.state[content.silverStateAmt]}
										onChange={this.handleChange(`${content.silverStateAmt}`)}
										type="number"
										className={classes.textFieldAmt}
										margin="dense"
										inputProps={{ 'aria-label': 'bare' }}
									/>
								) : null}
							</div>
							<div>
								<FormControlLabel label="Trophy" control={<Checkbox checked={this.state[content.trophyState]} onChange={this.handleCheced(`${content.trophyState}`)} value={this.state[content.trophyState]} />} />
								{this.state[content.trophyState] ? (
									<TextField
										id="number"
										variant="outlined"
										label="Amount"
										value={this.state[content.trophyStateAmt]}
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
			<Fragment>
				<h2 className={classes.titleh2}>Achievements</h2>
				<p className={classes.underHeader}>
					Once you submit statistics to the database, an image will generate and give you the URL.
					<br />
					Your saved statistics will automatically be loaded next time you visit the page.
				</p>

				<form onSubmit={this.handleSubmit} className={classes.achievementsForm} noValidate autoComplete="off">
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
			</Fragment>
		);
	}
}

export default withStyles(styles)(Achievements);
