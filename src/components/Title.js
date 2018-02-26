import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ children, header }) => {
	const title = children;
	if (!title) {
		return null;
	}
	if (typeof(document) !== 'undefined' &&
		document.title !== title) {
		document.title = `${title} - @bozdoz`;
	}
	return (
		<h1 id="page-title">{header || title}</h1>
	);
}

Title.propTypes = {
	children: PropTypes.string.isRequired,
	header: PropTypes.string
};

export default Title;