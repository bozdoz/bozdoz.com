import React from 'react';

import Contact from '../Contact';
import FrontMatter, { FrontMatterProps } from '../FrontMatter';

const IndexPage = (props: FrontMatterProps) => (
  <FrontMatter source="index" {...props}>
    <Contact />
  </FrontMatter>
);

export default IndexPage;
