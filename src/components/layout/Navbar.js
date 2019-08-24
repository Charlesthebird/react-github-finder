import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/*
export class Navbar extends Component {
	// defaultProps is a special property of the Component class that will be used if the props are not provided as inputs
	static defaultProps = {
		title: 'Default Title',
		icon: 'fab fa-github'
	};

	// propTypes can be used to specify the types
	// even though it says 'isRequired', it still compiles. It just throws an error.
	static propTypes = {
		title: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired
	};

	render() {
		return (
			<nav className='navbar bg-primary'>
				<h1>
					<i className={this.props.icon} />
					&nbsp;
					{this.props.title}
				</h1>
			</nav>
		);
	}
}
*/

const Navbar = ({ icon, title }) => {
	return (
		<nav className='navbar bg-primary'>
			<h1>
				<i className={icon} />
				&nbsp;
				{title}
			</h1>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/about'>About</Link>
				</li>
			</ul>
		</nav>
	);
};

Navbar.defaultProps = {
	title: 'Default Title',
	icon: 'fab fa-github'
};
Navbar.propTypes = {
	icon: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
};

export default Navbar;
