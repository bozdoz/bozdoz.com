import React from 'react';
import FrontMatter from './FrontMatter';
import Contact from './Contact';

const NotFoundPage = (props) => (
	<FrontMatter source="404" {...props}>
		<div className="container">
			<Contact />
		</div>
	</FrontMatter>
);

export default NotFoundPage;