import React from 'react';
import PlainPage from './PlainPage';
import Contact from './Contact';

const IndexPage = (props) => (
	<PlainPage source="index" {...props}>
		<Contact />
	</PlainPage>
);

export default IndexPage;