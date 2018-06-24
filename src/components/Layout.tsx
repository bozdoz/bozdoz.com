import * as React from 'react';

import NavHeader from './NavHeader';
import Nav from './Nav';
import NavFooter from './NavFooter';

const Layout = ({ children }: { children: JSX.Element[] }) => (
  <div id="page-container">
    <nav id="nav">
      <div id="nav-top">
        <NavHeader />
        <Nav />
      </div>
      <NavFooter />
    </nav>
    <main id="main">{children}</main>
  </div>
);

export default Layout;
