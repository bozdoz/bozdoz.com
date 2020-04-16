import * as React from 'react';

import Contact from '../Contact';
import FrontMatter from '../FrontMatter';

const AboutPage = (props: any) => (
  <FrontMatter {...props}>
    <Contact />
  </FrontMatter>
);

export default AboutPage;
