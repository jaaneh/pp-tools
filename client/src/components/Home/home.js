import React, { Component } from 'react';

import Container from '@material-ui/core/Container';

import './home.css';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			homeMessage: 'To access tools, please log in.'
		};
	}

	componentWillMount() {
		document.title = 'partypoker Tools - Home';
	}

	componentDidMount() {
		const token = localStorage.getItem('token');

		if (token) {
			this.setState({ homeMessage: 'Welcome back!' });
		}
	}

	render() {
		const { homeMessage } = this.state;

		return (
			<section className="main">
				<Container>
					<h2>Home</h2>
					<p style={{ fontSize: 18 }}>{homeMessage}</p>
				</Container>
			</section>
		);
	}
}

export default Home;
