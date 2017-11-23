import React from 'react';
import FrontMatter from './FrontMatter';
import Contact from './Contact';

const NotFoundPage = ({ staticContext, markdown }) => {
	if (staticContext) {
		staticContext.is404 = true;
	}
	return (
		<FrontMatter source="404" markdown={markdown}>
			<div className="container">
				<Contact />
			</div>
		</FrontMatter>
	);
};

export default NotFoundPage;