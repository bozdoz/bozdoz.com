import * as React from 'react';

import Brand from '../Brand';
import MainNav from '../MainNav';
import SocialNav from '../SocialNav';

interface Props {
  children: JSX.Element[]
}

export default ({ children }: Props) => (
  <React.Fragment>
    <header id="header">
      <Brand />
      <MainNav />
      <SocialNav />
    </header>
    <main id="main">{children}</main>
  </React.Fragment>
);