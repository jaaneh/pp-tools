import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';

import Header from './components/Header/header';
import Home from './components/Home/home';
import SignUp from './components/SignUp/signup';
import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboard';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#171521'
		}
	}
});

const generateClassName = createGenerateClassName({
	productionPrefix: 'party-'
});

class App extends Component {
	componentDidMount() {
		const token = localStorage.getItem('token');
		if (token) {
			this.setState({ isLoggedIn: true });
		}
	}

	render() {
		return (
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={theme}>
					<Header />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/signup" component={SignUp} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/dashboard" component={Dashboard} />
					</Switch>
				</MuiThemeProvider>
			</StylesProvider>
		);
	}
}

export default withRouter(App);
