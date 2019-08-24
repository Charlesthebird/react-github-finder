import React, { Fragment, Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';

/*
// function based approach
function App() {
	return (
		<div className='App'>
			<h1>Hello from React</h1>
		</div>
	);
}
*/

/*
// class based approach
class App extends Component {
	foo = () => 'bars';
	render() {
		const name = 'John Doe';
		const loading = false;
		const showName = true;
		
    // this is a way we could do react without using JSX
    // it's inconvenient, so JSX should be used instead.
		// return React.createElement(
			// 'div',
			// { className: 'App' },
			// React.createElement('h1', null, 'Hello From React')
    // );
    
		// here is what JSX looks like
		return (
			// the Fragment or <></> will remove the auto-generated <App></App> div element that surrounds the returned element.
			<React.Fragment>
				<div className='App'>
					{// ternary operator can be used within the return statement (if statements can't be used here).
					// Notice how {showName && name} is used here to conditionally show the name
					loading ? <h4>Loading...</h4> : <h1>Hello {showName && name}!</h1>}

					{
						//<h1>Hello {name.toUpperCase()}</h1>
					}
					<h1>Hello {this.foo()}</h1>
					<h4>Testing classes</h4>
					<label htmlFor='name'>Name</label>
				</div>
				<h2>by</h2>
			</React.Fragment>
		);
	}
}
*/

class App extends Component {
	state = {
		user: {},
		repos: [],
		users: [],
		loading: false,
		alert: null
	};
	// (not loading users at start now that search is working)
	// async componentDidMount() {
	loadAllUsers = async () => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users?client_id=${
				process.env.REACT_APP_GITHUB_CLIENT_ID
			}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({
			users: res.data.items,
			loading: false
		});
	};
	// get a single GitHub User
	getUser = async username => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${
				process.env.REACT_APP_GITHUB_CLIENT_ID
			}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({
			user: res.data,
			loading: false
		});
	};

	// get a GitHub User's repos
	getUserRepos = async username => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
				process.env.REACT_APP_GITHUB_CLIENT_ID
			}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({
			repos: res.data,
			loading: false
		});
	};

	clearUsers = txt => {
		this.setState({ users: [], loading: false });
	};
	searchUsers = async txt => {
		// if (txt === '') {
		// 	this.loadAllUsers();
		// 	return;
		// }
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${txt}&client_id=${
				process.env.REACT_APP_GITHUB_CLIENT_ID
			}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({
			users: res.data.items,
			loading: false
		});
	};
	setAlert = (msg, type) => {
		// the next two lines do the same thing
		// this.setState({ alert: { msg: msg, type: type } });
		this.setState({ alert: { msg, type } });
		// setTimeout(() => {
		// 	this.setState({ alert: null });
		// }, 5000);
	};
	clearAlert = () => {
		this.setState({ alert: null });
	};

	render() {
		const { user, users, loading, repos } = this.state;
		return (
			<Router>
				<div className='App'>
					<Navbar title='Github Finder' icon='fab fa-github' />
					<div className='container'>
						<Alert alert={this.state.alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={props => (
									<Fragment>
										<Search
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											showClear={users.length > 0 ? true : false}
											setAlert={this.setAlert}
											clearAlert={this.clearAlert}
										/>
										<Users loading={loading} users={users} />
									</Fragment>
								)}
							/>
							<Route exact path='/about' component={About} />
							<Route
								exact
								path='/user/:login'
								render={props => (
									<User
										{...props}
										getUser={this.getUser}
										getUserRepos={this.getUserRepos}
										repos={repos}
										user={user}
										loading={loading}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
