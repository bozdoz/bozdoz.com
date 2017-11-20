import React from 'react';
import Content from './Content';
import Contact from './Contact';

const NotFoundPage = (props) => (
	<Content source="404" {...props}>
		<div className="container">
			<Contact />
		</div>
	</Content>
);

export default NotFoundPage;