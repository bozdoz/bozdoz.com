import * as React from 'react';
import { NavLink } from 'react-router-dom';

const list = [
  {
    href: '/projects',
    text: 'Projects'
  },
  {
    href: '/about',
    text: 'About'
  }
];

export default () => (
  <nav id="main-nav" aria-label="Main">
    {list.map(({ href, text }) => (
      <React.Fragment key={href}>
        <NavLink to={href} title={text} activeClassName="active">
          <span className="nav-text">{text}</span>
        </NavLink>{' '}
      </React.Fragment>
    ))}
  </nav>
);
