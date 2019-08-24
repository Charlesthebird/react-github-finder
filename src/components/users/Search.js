import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
	state = {
		text: ''
	};
	static propTypes = {
		searchUsers: PropTypes.func.isRequired,
		clearUsers: PropTypes.func.isRequired,
		setAlert: PropTypes.func.isRequired,
		clearAlert: PropTypes.func.isRequired,
		showClear: PropTypes.bool.isRequired
	};

	onSubmit = e => {
		// default behaviour of submitting a form is to refresh the page
		// We're technically submitting a form but we don't want to refresh the page, so use preventDefault here.
		e.preventDefault();
		if (this.state.text === '') {
			this.props.setAlert('Please enter something', 'light');
		} else {
			this.props.searchUsers(this.state.text);
			this.setState({ text: '' });
		}
	};

	onChange = e => {
		this.setState({ text: e.target.value });
		if (e.target.value !== '') {
			this.props.clearAlert();
		}
	};
	render() {
		const { showClear, clearUsers } = this.props;
		return (
			<div>
				<form className='form' onSubmit={this.onSubmit}>
					<input
						type='text'
						name='text'
						placeholder='Search Users'
						value={this.state.text}
						onChange={this.onChange}
					/>
					<input
						type='submit'
						value='Search'
						className='btn btn-dark btn-block'
					/>
				</form>
				{showClear && (
					<button className='btn btn-light btn-block' onClick={clearUsers}>
						Clear
					</button>
				)}
			</div>
		);
	}
}

export default Search;
