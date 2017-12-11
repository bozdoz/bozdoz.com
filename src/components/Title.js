import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ children }) => {
	const title = children;
	if (!title) {
		return null;
	}
	if (typeof(document) !== 'undefined' &&
		document.title !== title) {

		// main page is titled @bozdoz
		// site is also titled @bozdoz
		if (title === '@bozdoz') {
			// DRY!
			document.title = '@bozdoz';
		} else {
			// page-specific title
			document.title = `${title} - @bozdoz`;
		}
	}
	return (
		<h1>{title}</h1>
	);
}

Title.propTypes = {
	children: PropTypes.string.isRequired
};

export default Title;