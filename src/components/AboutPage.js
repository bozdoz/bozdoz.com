import React from 'react';
import Content from './Content';
import Contact from './Contact';

const AboutPage = (props) => (
	<Content source="about" {...props}>
		<div className="container">
			<Contact />
		</div>
	</Content>
);

export default AboutPage;