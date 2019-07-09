import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const formFieldsConfig = require('./formFields');
const styles = require('./styles');

const helpText = {
	beforeSubmit: 'Make sure you have the correct values before submitting.'
};

const submitButton = React.forwardRef((props, ref) => <button {...props} ref={ref} type="submit" />);

class Knockouts extends Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			submitLoading: false,
			submitSuccess: false,
			disableButton: false,
			generatedURL: '',
			mattstaples: 0,
			jeffgross: 0,
			kristenbicknell: 0,
			allinpav: 0,
			kevinmartin: 0,
			luimartins: 0,
			anatolyfilatov: 0,
			hotted: 0,
			ryanschoonbaert: 0,
			egption: 0,
			dramaticdegen: 0,
			courtiebee: 0,
			elky: 0,
			patrickleonard: 0,
			heymonia: 0,
			dwstevie: 0,
			tonkaaaap: 0,
			isildur: 0,
			bencb: 0
		};
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	componentDidMount() {
		const token = localStorage.getItem('token');

		fetch('/api/v1/knockouts', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => res.json())
			.then(json => {
				if (json.success.message) {
					const values = json.success.message;

					this.setState({
						mattstaples: values.matt_staples || 0,
						jeffgross: values.jeff_gross || 0,
						kristenbicknell: values.kristen_bicknell || 0,
						allinpav: values.allinpav || 0,
						kevinmartin: values.kevin_martin || 0,
						luimartins: values.lui_martins || 0,
						anatolyfilatov: values.anatoly_filatov || 0,
						hotted: values.hotted || 0,
						ryanschoonbaert: values.ryan_schoonbaert || 0,
						egption: values.egption || 0,
						dramaticdegen: values.dramatic_degen || 0,
						courtiebee: values.courtiebee || 0,
						elky: values.elky || 0,
						patrickleonard: values.patrick_leonard || 0,
						heymonia: values.heymonia || 0,
						dwstevie: values.dwstevie || 0,
						tonkaaaap: values.tonkaaaap || 0,
						isildur: values.isildur || 0,
						bencb: values.bencb || 0
					});
				}
			})
			.catch(err => console.log(err));
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		});
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

			fetch('/api/v1/knockouts', {
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
			return <TextField key={i} id="number" label={content.name} value={this.state[content.state]} onChange={this.handleChange(`${content.state}`)} type="number" className={classes.textField} margin="normal" />;
		});

		return (
			<div>
				<h2 className={classes.titleh2}>Knockouts</h2>
				<p className={classes.underHeader}>
					Once you submit statistics to the database, an image will generate and give you the URL.
					<br />
					Your saved statistics will automatically be loaded next time you visit the page.
				</p>

				<form onSubmit={this.handleSubmit} className={classes.knockoutsForm} noValidate autoComplete="off">
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

export default withStyles(styles)(Knockouts);
