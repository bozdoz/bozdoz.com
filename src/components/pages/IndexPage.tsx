import * as React from 'react';

import Contact from '../Contact';
import FrontMatter from '../FrontMatter';

const IndexPage = (props: any) => (
  <FrontMatter source="index" {...props}>
    <Contact />
  </FrontMatter>
);

export default IndexPage;
