import * as React from 'react';

import PlainPage from './PlainPage';
import Contact from '../Contact';

const IndexPage = (props: any) => (
  <PlainPage source="index" {...props}>
    <Contact />
  </PlainPage>
);

export default IndexPage;
