import React from 'react';

const ErrorMessage = ({message}) => {
	return (
		<span className="form--error">{message}</span>
	);
};

ErrorMessage.propTypes = {
	message: React.PropTypes.string.isRequired
};

export default ErrorMessage;