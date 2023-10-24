import React from 'react';

import Brand from '../Brand';
import MainNav from '../MainNav';

interface Props {
  children: JSX.Element[];
}

const Layout = ({ children }: Props) => (
  <React.Fragment>
    <header id="header">
      <Brand />
      <MainNav />
    </header>
    <main id="main">{children}</main>
  </React.Fragment>
);

export default Layout;
