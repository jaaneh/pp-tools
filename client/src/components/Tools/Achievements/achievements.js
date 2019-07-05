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
			deepstack215: 0,
			deepstack215FtAmt: 0,
			deepstack215Bronze: false,
			deepstack215Silver: false,
			deepstack215Trophy: false,
			gladiator320: 0,
			gladiator320FtAmt: 0,
			gladiator320Bronze: false,
			gladiator320Silver: false,
			gladiator320Trophy: false,
			mmbounty215: 0,
			mmbounty215FtAmt: 0,
			mmbounty215Bronze: false,
			mmbounty215Silver: false,
			mmbounty215Trophy: false,
			clasico530: 0,
			clasico530FtAmt: 0,
			clasico530Bronze: false,
			clasico530Silver: false,
			clasico530Trophy: false,
			warmup82: 0,
			warmup82FtAmt: 0,
			warmup82Bronze: false,
			warmup82Silver: false,
			warmup82Trophy: false,
			dailygrind109: 0,
			dailygrind109FtAmt: 0,
			dailygrind109Bronze: false,
			dailygrind109Silver: false,
			dailygrind109Trophy: false,
			terminator109: 0,
			terminator109FtAmt: 0,
			terminator109Bronze: false,
			terminator109Silver: false,
			terminator109Trophy: false,
			deepstack55: 0,
			deepstack55FtAmt: 0,
			deepstack55Bronze: false,
			deepstack55Silver: false,
			deepstack55Trophy: false,
			gladiator55: 0,
			gladiator55FtAmt: 0,
			gladiator55Bronze: false,
			gladiator55Silver: false,
			gladiator55Trophy: false,
			mmbounty55: 0,
			mmbounty55FtAmt: 0,
			mmbounty55Bronze: false,
			mmbounty55Silver: false,
			mmbounty55Trophy: false,
			clasico109: 0,
			clasico109FtAmt: 0,
			clasico109Bronze: false,
			clasico109Silver: false,
			clasico109Trophy: false,
			warmup22: 0,
			warmup22FtAmt: 0,
			warmup22Bronze: false,
			warmup22Silver: false,
			warmup22Trophy: false,
			dailygrind33: 0,
			dailygrind33FtAmt: 0,
			dailygrind33Bronze: false,
			dailygrind33Silver: false,
			dailygrind33Trophy: false,
			terminator33: 0,
			terminator33FtAmt: 0,
			terminator33Bronze: false,
			terminator33Silver: false,
			terminator33Trophy: false,
			deepstack11: 0,
			deepstack11FtAmt: 0,
			deepstack11Bronze: false,
			deepstack11Silver: false,
			deepstack11Trophy: false,
			gladiator11: 0,
			gladiator11FtAmt: 0,
			gladiator11Bronze: false,
			gladiator11Silver: false,
			gladiator11Trophy: false,
			mmbounty11: 0,
			mmbounty11FtAmt: 0,
			mmbounty11Bronze: false,
			mmbounty11Silver: false,
			mmbounty11Trophy: false,
			clasico33: 0,
			clasico33FtAmt: 0,
			clasico33Bronze: false,
			clasico33Silver: false,
			clasico33Trophy: false
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
						terminator530Trophy: values.terminator530Silver || false,
						deepstack215: values.deepstack215 || 0,
						deepstack215FtAmt: values.deepstack215FtAmt || 0,
						deepstack215Bronze: values.deepstack215Bronze || false,
						deepstack215Silver: values.deepstack215Silver || false,
						deepstack215Trophy: values.deepstack215Trophy || false,
						gladiator320: values.gladiator320 || 0,
						gladiator320FtAmt: values.gladiator320FtAmt || 0,
						gladiator320Bronze: values.gladiator320Bronze || false,
						gladiator320Silver: values.gladiator320Silver || false,
						gladiator320Trophy: values.gladiator320Trophy || false,
						mmbounty215: values.mmbounty215 || 0,
						mmbounty215FtAmt: values.mmbounty215FtAmt || 0,
						mmbounty215Bronze: values.mmbounty215Bronze || false,
						mmbounty215Silver: values.mmbounty215Silver || false,
						mmbounty215Trophy: values.mmbounty215Trophy || false,
						clasico530: values.clasico530 || 0,
						clasico530FtAmt: values.clasico530FtAmt || 0,
						clasico530Bronze: values.clasico530Bronze || false,
						clasico530Silver: values.clasico530Silver || false,
						clasico530Trophy: values.clasico530Trophy || false,
						warmup82: values.warmup82 || 0,
						warmup82FtAmt: values.warmup82FtAmt || 0,
						warmup82Bronze: values.warmup82Bronze || false,
						warmup82Silver: values.warmup82Silver || false,
						warmup82Trophy: values.warmup82Trophy || false,
						dailygrind109: values.dailygrind109 || 0,
						dailygrind109FtAmt: values.dailygrind109FtAmt || 0,
						dailygrind109Bronze: values.dailygrind109Bronze || false,
						dailygrind109Silver: values.dailygrind109Silver || false,
						dailygrind109Trophy: values.dailygrind109Trophy || false,
						terminator109: values.terminator109 || 0,
						terminator109FtAmt: values.terminator109FtAmt || 0,
						terminator109Bronze: values.terminator109Bronze || false,
						terminator109Silver: values.terminator109Silver || false,
						terminator109Trophy: values.terminator109Trophy || false,
						deepstack55: values.deepstack55 || 0,
						deepstack55FtAmt: values.deepstack55FtAmt || 0,
						deepstack55Bronze: values.deepstack55Bronze || false,
						deepstack55Silver: values.deepstack55Silver || false,
						deepstack55Trophy: values.deepstack55Trophy || false,
						gladiator55: values.gladiator55 || 0,
						gladiator55FtAmt: values.gladiator55FtAmt || 0,
						gladiator55Bronze: values.gladiator55Bronze || false,
						gladiator55Silver: values.gladiator55Silver || false,
						gladiator55Trophy: values.gladiator55Trophy || false,
						mmbounty55: values.mmbounty55 || 0,
						mmbounty55FtAmt: values.mmbounty55FtAmt || 0,
						mmbounty55Bronze: values.mmbounty55Bronze || false,
						mmbounty55Silver: values.mmbounty55Silver || false,
						mmbounty55Trophy: values.mmbounty55Trophy || false,
						clasico109: values.clasico109 || 0,
						clasico109FtAmt: values.clasico109FtAmt || 0,
						clasico109Bronze: values.clasico109Bronze || false,
						clasico109Silver: values.clasico109Silver || false,
						clasico109Trophy: values.clasico109Trophy || false,
						warmup22: values.warmup22 || 0,
						warmup22FtAmt: values.warmup22FtAmt || 0,
						warmup22Bronze: values.warmup22Bronze || false,
						warmup22Silver: values.warmup22Silver || false,
						warmup22Trophy: values.warmup22Trophy || false,
						dailygrind33: values.dailygrind33 || 0,
						dailygrind33FtAmt: values.dailygrind33FtAmt || 0,
						dailygrind33Bronze: values.dailygrind33Bronze || false,
						dailygrind33Silver: values.dailygrind33Silver || false,
						dailygrind33Trophy: values.dailygrind33Trophy || false,
						terminator33: values.terminator33 || 0,
						terminator33FtAmt: values.terminator33FtAmt || 0,
						terminator33Bronze: values.terminator33Bronze || false,
						terminator33Silver: values.terminator33Silver || false,
						terminator33Trophy: values.terminator33Trophy || false,
						deepstack11: values.deepstack11 || 0,
						deepstack11FtAmt: values.deepstack11FtAmt || 0,
						deepstack11Bronze: values.deepstack11Bronze || false,
						deepstack11Silver: values.deepstack11Silver || false,
						deepstack11Trophy: values.deepstack11Trophy || false,
						gladiator11: values.gladiator11 || 0,
						gladiator11FtAmt: values.gladiator11FtAmt || 0,
						gladiator11Bronze: values.gladiator11Bronze || false,
						gladiator11Silver: values.gladiator11Silver || false,
						gladiator11Trophy: values.gladiator11Trophy || false,
						mmbounty11: values.mmbounty11 || 0,
						mmbounty11FtAmt: values.mmbounty11FtAmt || 0,
						mmbounty11Bronze: values.mmbounty11Bronze || false,
						mmbounty11Silver: values.mmbounty11Silver || false,
						mmbounty11Trophy: values.mmbounty11Trophy || false,
						clasico33: values.clasico33 || 0,
						clasico33FtAmt: values.clasico33FtAmt || 0,
						clasico33Bronze: values.clasico33Bronze || false,
						clasico33Silver: values.clasico33Silver || false,
						clasico33Trophy: values.clasico33Trophy || false
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
				terminator530: this.state.terminator530 || 0,
				terminator530FtAmt: this.state.terminator530FtAmt || 0,
				terminator530Bronze: this.state.terminator530Bronze || false,
				terminator530Silver: this.state.terminator530Silver || false,
				terminator530Trophy: this.state.terminator530Trophy || false,
				deepstack215: this.state.deepstack215 || 0,
				deepstack215FtAmt: this.state.deepstack215FtAmt || 0,
				deepstack215Bronze: this.state.deepstack215Bronze || false,
				deepstack215Silver: this.state.deepstack215Silver || false,
				deepstack215Trophy: this.state.deepstack215Trophy || false,
				gladiator320: this.state.gladiator320 || 0,
				gladiator320FtAmt: this.state.gladiator320FtAmt || 0,
				gladiator320Bronze: this.state.gladiator320Bronze || false,
				gladiator320Silver: this.state.gladiator320Silver || false,
				gladiator320Trophy: this.state.gladiator320Trophy || false,
				mmbounty215: this.state.mmbounty215 || 0,
				mmbounty215FtAmt: this.state.mmbounty215FtAmt || 0,
				mmbounty215Bronze: this.state.mmbounty215Bronze || false,
				mmbounty215Silver: this.state.mmbounty215Silver || false,
				mmbounty215Trophy: this.state.mmbounty215Trophy || false,
				clasico530: this.state.clasico530 || 0,
				clasico530FtAmt: this.state.clasico530FtAmt || 0,
				clasico530Bronze: this.state.clasico530Bronze || false,
				clasico530Silver: this.state.clasico530Silver || false,
				clasico530Trophy: this.state.clasico530Trophy || false,
				warmup82: this.state.warmup82 || 0,
				warmup82FtAmt: this.state.warmup82FtAmt || 0,
				warmup82Bronze: this.state.warmup82Bronze || false,
				warmup82Silver: this.state.warmup82Silver || false,
				warmup82Trophy: this.state.warmup82Trophy || false,
				dailygrind109: this.state.dailygrind109 || 0,
				dailygrind109FtAmt: this.state.dailygrind109FtAmt || 0,
				dailygrind109Bronze: this.state.dailygrind109Bronze || false,
				dailygrind109Silver: this.state.dailygrind109Silver || false,
				dailygrind109Trophy: this.state.dailygrind109Trophy || false,
				terminator109: this.state.terminator109 || 0,
				terminator109FtAmt: this.state.terminator109FtAmt || 0,
				terminator109Bronze: this.state.terminator109Bronze || false,
				terminator109Silver: this.state.terminator109Silver || false,
				terminator109Trophy: this.state.terminator109Trophy || false,
				deepstack55: this.state.deepstack55 || 0,
				deepstack55FtAmt: this.state.deepstack55FtAmt || 0,
				deepstack55Bronze: this.state.deepstack55Bronze || false,
				deepstack55Silver: this.state.deepstack55Silver || false,
				deepstack55Trophy: this.state.deepstack55Trophy || false,
				gladiator55: this.state.gladiator55 || 0,
				gladiator55FtAmt: this.state.gladiator55FtAmt || 0,
				gladiator55Bronze: this.state.gladiator55Bronze || false,
				gladiator55Silver: this.state.gladiator55Silver || false,
				gladiator55Trophy: this.state.gladiator55Trophy || false,
				mmbounty55: this.state.mmbounty55 || 0,
				mmbounty55FtAmt: this.state.mmbounty55FtAmt || 0,
				mmbounty55Bronze: this.state.mmbounty55Bronze || false,
				mmbounty55Silver: this.state.mmbounty55Silver || false,
				mmbounty55Trophy: this.state.mmbounty55Trophy || false,
				clasico109: this.state.clasico109 || 0,
				clasico109FtAmt: this.state.clasico109FtAmt || 0,
				clasico109Bronze: this.state.clasico109Bronze || false,
				clasico109Silver: this.state.clasico109Silver || false,
				clasico109Trophy: this.state.clasico109Trophy || false,
				warmup22: this.state.warmup22 || 0,
				warmup22FtAmt: this.state.warmup22FtAmt || 0,
				warmup22Bronze: this.state.warmup22Bronze || false,
				warmup22Silver: this.state.warmup22Silver || false,
				warmup22Trophy: this.state.warmup22Trophy || false,
				dailygrind33: this.state.dailygrind33 || 0,
				dailygrind33FtAmt: this.state.dailygrind33FtAmt || 0,
				dailygrind33Bronze: this.state.dailygrind33Bronze || false,
				dailygrind33Silver: this.state.dailygrind33Silver || false,
				dailygrind33Trophy: this.state.dailygrind33Trophy || false,
				terminator33: this.state.terminator33 || 0,
				terminator33FtAmt: this.state.terminator33FtAmt || 0,
				terminator33Bronze: this.state.terminator33Bronze || false,
				terminator33Silver: this.state.terminator33Silver || false,
				terminator33Trophy: this.state.terminator33Trophy || false,
				deepstack11: this.state.deepstack11 || 0,
				deepstack11FtAmt: this.state.deepstack11FtAmt || 0,
				deepstack11Bronze: this.state.deepstack11Bronze || false,
				deepstack11Silver: this.state.deepstack11Silver || false,
				deepstack11Trophy: this.state.deepstack11Trophy || false,
				gladiator11: this.state.gladiator11 || 0,
				gladiator11FtAmt: this.state.gladiator11FtAmt || 0,
				gladiator11Bronze: this.state.gladiator11Bronze || false,
				gladiator11Silver: this.state.gladiator11Silver || false,
				gladiator11Trophy: this.state.gladiator11Trophy || false,
				mmbounty11: this.state.mmbounty11 || 0,
				mmbounty11FtAmt: this.state.mmbounty11FtAmt || 0,
				mmbounty11Bronze: this.state.mmbounty11Bronze || false,
				mmbounty11Silver: this.state.mmbounty11Silver || false,
				mmbounty11Trophy: this.state.mmbounty11Trophy || false,
				clasico33: this.state.clasico33 || 0,
				clasico33FtAmt: this.state.clasico33FtAmt || 0,
				clasico33Bronze: this.state.clasico33Bronze || false,
				clasico33Silver: this.state.clasico33Silver || false,
				clasico33Trophy: this.state.clasico33Trophy || false
			};

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
			</div>
		);
	}
}

export default withStyles(styles)(Achievements);
