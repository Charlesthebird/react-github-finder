import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/*
export class UserItem extends Component {
	constructor() {
		super();
		// console.log('1,2,3');
		// example of using class-based state
		// this.state = {
		// 	id: 'id',
		// 	login: 'mojondo',
		// 	avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4"',
		// 	html_url: 'https://github.com/mojombo'
		// };
	}
	render() {
		// can pull out the variables from this.state using this method
		// (makes it look neater)
		// const { login, avatar_url, html_url } = this.state;

		// can pull it from props in the same way
		// when they are all pulled in as props, this component is then stateless! (Can be then converted into a function)
		const { login, avatar_url, html_url } = this.props.user;

		return (
			<div className='card text-center'>
				<img
					src={avatar_url}
					alt=''
					className='round-img'
					style={{
						width: '60px'
					}}
				/>
				<h3>{login}</h3>
				<a href={html_url} className='btn btn-dark btn-sm my-1'>
					More
				</a>
			</div>
		);
	}
}
*/

// functional component example (a bit cleaner)
// const UserItem = props => {
// 	const { login, avatar_url, html_url } = props.user;
const UserItem = ({ user: { login, avatar_url, html_url } }) => {
	return (
		<div className='card text-center'>
			<img
				src={avatar_url}
				alt=''
				className='round-img'
				style={{
					width: '60px'
				}}
			/>
			<h3>{login}</h3>
			<Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>
				More
			</Link>
		</div>
	);
};

UserItem.propTypes = {
	user: PropTypes.object.isRequired
};

export default UserItem;
