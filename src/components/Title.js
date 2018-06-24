import * as React from 'react';
import * as PropTypes from 'prop-types';

/**
* It sets the document title and updates/creates the 
* Page title element (#page-title) in the page
*
* @param Object props: {children (String), header? (String)}
* @return h1 DOM Element
*/
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