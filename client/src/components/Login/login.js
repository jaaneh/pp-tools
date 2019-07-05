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
	username: 'Enter your username',
	password: 'Enter your password'
};

const submitButton = React.forwardRef((props, ref) => <button {...props} ref={ref} type="submit" />);

class Login extends Component {
	constructor() {
		super();
		this.handleSignUp = this.handleSignUp.bind(this);
		this.state = {
			username: '',
			password: '',
			errorMessage: '',
			disableButton: false,
			isLoggedIn: false
		};
	}

	componentWillMount() {
		document.title = 'partypoker Tools - Login';
	}

	componentDidMount() {
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

		if (username.length >= 3 && username.length <= 16 && password.length >= 4) {
			return true;
		}
	};

	handleSignUp = event => {
		event.preventDefault();
		this.setState({ disableButton: true });

		if (this.formIsValid()) {
			const body = {
				username: this.state.username.toLowerCase(),
				password: this.state.password,
				last_login: new Date().getTime()
			};

			fetch('/api/v1/user/login', {
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
					this.setState({ errorMessage: '✔ Welcome!' });
					setTimeout(() => {
						this.setState({ isLoggedIn: true });
						this.props.history.push('/dashboard');
					}, 1500);
				})
				.catch(error => {
					setTimeout(() => {
						this.setState({ disableButton: false });
					}, 1500);
				});
		} else {
			this.setState({ errorMessage: '✖ Invaild form.' });
			setTimeout(() => {
				this.setState({ disableButton: false, errorMessage: '' });
			}, 1500);
		}
	};

	render() {
		const { classes } = this.props;
		const { errorMessage, disableButton } = this.state;
		const submitEnable = this.state.disableButton;

		return (
			<section className={classes.main}>
				<h2 className={classes.titleh2}>Login</h2>
				<form onSubmit={this.handleSignUp} className={classes.loginForm} noValidate autoComplete="off">
					<FormControl variant="filled" className={classes.formControl}>
						<TextField type="text" id="username" label="Username" onChange={this.handleChange('username')} variant="filled" />
						<FormHelperText>{helpText.username}</FormHelperText>
					</FormControl>
					<FormControl variant="filled" className={classes.formControl}>
						<TextField type="password" id="password" label="Password" onChange={this.handleChange('password')} variant="filled" />
						<FormHelperText>{helpText.password}</FormHelperText>
					</FormControl>
					<FormControl className={classes.formControl} variant="filled">
						<Button className={classes.submitBtn} classes={{ disabled: classes.submitDisabled }} component={submitButton} variant="contained" disabled={submitEnable}>
							Login
							{disableButton && <CircularProgress size={38} className={classes.loadingSymbol} />}
						</Button>
					</FormControl>

					<FormControl className={classes.formControl} variant="filled">
						{errorMessage ? <p className={classes.errorMessage}>{errorMessage}</p> : null}
					</FormControl>
				</form>
			</section>
		);
	}
}

export default withRouter(withStyles(styles, theme)(Login));
