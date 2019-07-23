import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';

const styles = require('./styles');

class UserActions extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			columns: [
				{ title: 'Username', field: 'username' },
				{ title: 'User ID', field: '_id', editable: 'never' },
				{ title: 'Admin', field: 'isAdmin', type: 'boolean' },
				{
					title: 'Last Login',
					field: 'last_login',
					editable: 'never',
					render: rowData => {
						const date = new Date(rowData.last_login).toLocaleDateString('en-US');
						return date;
					}
				},
				{
					title: 'Signed Up',
					field: 'signed_up',
					editable: 'never',
					render: rowData => {
						const date = new Date(rowData.signed_up).toLocaleDateString('en-US');
						return date;
					}
				}
			]
		};
	}

	componentWillMount() {
		const token = localStorage.getItem('token');

		if (token) {
			fetch('/api/v1/user/getAll', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
				.then(res => res.json())
				.then(result => {
					if (result.all_users) {
						this.setState({ data: result.all_users });
					}
				})
				.catch(error => console.log(error));
		} else {
			localStorage.removeItem('token');
		}
	}

	deleteUser = data => {
		const token = localStorage.getItem('token');
		const body = { userId: data._id };

		fetch('/api/v1/user/delete', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}).catch(error => console.log(error));
	};

	editUser = data => {
		const token = localStorage.getItem('token');
		const body = {
			userId: data._id,
			username: data.username,
			isAdmin: data.isAdmin
		};

		fetch('/api/v1/user/editUser', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}).catch(error => console.log(error));
	};

	render() {
		return (
			<MaterialTable
				title="All Users"
				style={{ boxShadow: 'none' }}
				options={{ pageSize: 10 }}
				columns={this.state.columns}
				data={this.state.data}
				localization={{
					body: {
						editRow: {
							deleteText: 'Permanently delete user?'
						}
					}
				}}
				editable={{
					onRowUpdate: (newData, oldData) =>
						new Promise(resolve => {
							setTimeout(() => {
								resolve();
								this.editUser(newData);
								const data = [...this.state.data];
								data[data.indexOf(oldData)] = newData;
								this.setState({ ...this.state, data });
							}, 600);
						}),
					onRowDelete: oldData =>
						new Promise(resolve => {
							setTimeout(() => {
								resolve();
								this.deleteUser(oldData);
								const data = [...this.state.data];
								data.splice(data.indexOf(oldData), 1);
								this.setState({ ...this.state, data });
							}, 600);
						})
				}}
			/>
		);
	}
}

export default withStyles(styles)(UserActions);
