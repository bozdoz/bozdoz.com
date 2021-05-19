import React from 'react';
import { NavLink } from 'react-router-dom';

const list = [
  {
    href: '/projects',
    text: 'Projects'
  }
];

const MainNav = () => (
  <nav id="main-nav" aria-label="Main">
    {list.map(({ href, text }) => (
      <React.Fragment key={href}>
        <NavLink to={href} activeClassName="active">
          <span className="nav-text">{text}</span>
        </NavLink>
      </React.Fragment>
    ))}
  </nav>
);

export default MainNav;
