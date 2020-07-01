import * as React from 'react';

import Brand from '../Brand';

interface Props {
  children: JSX.Element[];
}

const Layout = ({ children }: Props) => (
  <React.Fragment>
    <header id="header">
      <Brand />
    </header>
    <main id="main">{children}</main>
  </React.Fragment>
);

export default Layout;
