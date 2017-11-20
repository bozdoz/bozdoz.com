import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ children }) => {
	const title = children;
	if (!title) {
		return null;
	}
	if (typeof(window) !== 'undefined' &&
		document.title !== title) {
		document.title = `${title} - bozdoz`;
	}
	return (
		<h1>{title}</h1>
	);
}

Title.propTypes = {
	children: PropTypes.string.isRequired
};

export default Title;