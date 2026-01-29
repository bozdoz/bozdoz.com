import React from 'react';
import { NavLink } from 'react-router-dom';

const list = [
  {
    href: '/projects',
    text: 'Projects',
  },
  {
    href: '/',
    text: 'About',
  },
];

const MainNav = () => {
  return (
    <nav id="main-nav" aria-label="Main">
      {list.map(({ href, text }) => (
        <React.Fragment key={href}>
          {href.startsWith('http') ? (
            <a href={href} rel="noopener noreferrer" target="_blank">
              <span className="nav-text">{text}</span>
            </a>
          ) : (
            <NavLink to={href} end>
              <span className="nav-text">{text}</span>
            </NavLink>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default MainNav;
