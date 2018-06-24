import * as React from 'react';

import PlainPage from './PlainPage';
import Contact from './Contact';

const AboutPage = (props) => (
	<PlainPage {...props}>
		<Contact />
	</PlainPage>
);

export default AboutPage;