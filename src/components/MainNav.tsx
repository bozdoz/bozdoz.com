import React from 'react';
import { NavLink } from 'react-router-dom';

const list = [
  {
    href: '/projects',
    text: 'Projects'
  },
  {
    href: '/',
    text: 'About'
  },
  {
    href: 'https://github.com/bozdoz',
    text: 'Contact'
  }
];

const MainNav = () => (
  <nav id="main-nav" aria-label="Main">
    {list.map(({ href, text }) => (
      <React.Fragment key={href}>
        {href.startsWith('http') ? (
          <a href={href} rel="noopener noreferer" target="_blank">
            <span className="nav-text">{text}</span>
          </a>
        ) : (
          <NavLink exact to={href} activeClassName="active">
            <span className="nav-text">{text}</span>
          </NavLink>
        )}
      </React.Fragment>
    ))}
  </nav>
);

export default MainNav;
