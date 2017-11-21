import React from 'react';
import PlainPage from './PlainPage';
import Contact from './Contact';

const AboutPage = (props) => (
	<PlainPage {...props}>
		<div className="container">
			<Contact />
		</div>
	</PlainPage>
);

export default AboutPage;