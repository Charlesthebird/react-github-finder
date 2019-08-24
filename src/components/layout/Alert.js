import React from 'react';
import PropTypes from 'prop-types';

// this function takes as parameters an object with all the properties as keys
const Alert = ({ alert }) => {
	return (
		// only show this if alert is not null
		alert !== null && (
			<div className={`alert alert-${alert.type}`}>
				<i className='fas fa-info-circle' /> {alert.msg}
			</div>
		)
	);
};
Alert.propTypes = {
	alert: PropTypes.object
};

export default Alert;
