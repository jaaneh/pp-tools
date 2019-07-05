import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

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
	username: 'Enter your username (min 3, max 16 characters)',
	password: 'Enter your password (min 8 characters)',
	repeatPassword: 'Repeat your password'
};

const submitButton = React.forwardRef((props, ref) => <button {...props} ref={ref} type="submit" />);

class SignUp extends Component {
	constructor() {
		super();
		this.handleSignUp = this.handleSignUp.bind(this);
		this.state = {
			username: '',
			password: '',
			repeatPassword: '',
			disableButton: false,
			usernameError: false,
			passwordError: false,
			repeatPasswordError: false,
			isLoggedIn: false
		};
	}

	componentDidMount() {
		document.title = 'partypoker Tools - Sign Up';

		const token = localStorage.getItem('token');

		if (token) {
			this.props.history.push('/dashboard');
		}
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	formIsValid = () => {
		const username = this.state.username;
		const password = this.state.password;
		const repeatPassword = this.state.repeatPassword;

		username.length < 3 || username.length > 16 ? this.setState({ usernameError: true }) : this.setState({ usernameError: false });
		password.length < 8 ? this.setState({ passwordError: true }) : this.setState({ passwordError: false });
		password !== repeatPassword ? this.setState({ repeatPasswordError: true }) : this.setState({ repeatPasswordError: false });

		if (username.length >= 3 && username.length <= 16 && /(^[a-zA-Z0-9_]+$)/.test(username) && password.length >= 8 && password === repeatPassword) {
			return true;
		}
	};

	handleSignUp = event => {
		event.preventDefault();
		this.setState({ disableButton: true });

		if (this.formIsValid()) {
			const body = {
				username: this.state.username,
				password: this.state.password,
				signed_up: new Date().getTime()
			};

			fetch('/api/v1/user/signup', {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(response => {
					if (response.ok) {
						return response.json();
					}
					return response.json().then(error => {
						throw new Error(error.message);
					});
				})
				.then(result => {
					localStorage.setItem('token', result.token);
					setTimeout(() => {
						this.setState({ isLoggedIn: true });
						this.props.history.push('/dashboard');
					}, 1000);
				})
				.catch(error => {
					console.log(error);
					setTimeout(() => {
						this.setState({ disableButton: false });
					}, 1000);
				});
		} else {
			// console.log('Invalid form..');
			setTimeout(() => {
				this.setState({ disableButton: false });
			}, 1000);
		}
	};

	render() {
		const { classes } = this.props;
		const { usernameError, passwordError, repeatPasswordError, disableButton } = this.state;
		const submitEnable = this.state.disableButton;

		return (
			<section className={classes.main}>
				<h2 className={classes.titleh2}>Sign Up</h2>

				<form onSubmit={this.handleSignUp} className={classes.signUpForm} noValidate autoComplete="off">
					<FormControl variant="filled" className={classes.formControl}>
						<TextField type="text" id="username" label="Username" onChange={this.handleChange('username')} variant="filled" error={usernameError} />
						<FormHelperText>{helpText.username}</FormHelperText>
					</FormControl>
					<FormControl variant="filled" className={classes.formControl}>
						<TextField type="password" id="password" label="Password" onChange={this.handleChange('password')} variant="filled" error={passwordError} />
						<FormHelperText>{helpText.password}</FormHelperText>
					</FormControl>
					<FormControl variant="filled" className={classes.formControl}>
						<TextField type="password" id="repeat-password" label="Repeat Password" onChange={this.handleChange('repeatPassword')} variant="filled" error={repeatPasswordError} />
						<FormHelperText>{helpText.repeatPassword}</FormHelperText>
					</FormControl>

					<FormControl className={classes.formControl} variant="filled">
						<Button className={classes.submitBtn} classes={{ disabled: classes.submitDisabled }} component={submitButton} variant="contained" disabled={submitEnable}>
							Sign up
							{disableButton && <CircularProgress size={38} className={classes.loadingSymbol} />}
						</Button>
					</FormControl>
				</form>
			</section>
		);
	}
}

export default withRouter(withStyles(styles, theme)(SignUp));
