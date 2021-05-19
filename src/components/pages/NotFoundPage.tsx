import React from 'react';

import FrontMatter from '../FrontMatter';
import Contact from '../Contact';

const NotFoundPage = (props: any) => {
  // passes 404 status to server in ServerTemplate.tsx
  if (props.staticContext) {
    props.staticContext.is404 = true;
  }

  return (
    <FrontMatter source="404" {...props}>
      <Contact />
    </FrontMatter>
  );
};

export default NotFoundPage;
