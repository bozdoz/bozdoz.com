import React from 'react';
import PlainPage from './PlainPage';
import Contact from './Contact';

const IndexPage = (props) => (
	<PlainPage source="index" {...props}>
		<div className="container">
			<Contact />
		</div>
	</PlainPage>
);

export default IndexPage;