import * as React from 'react';

const list = [
  {
    href: 'https://github.com/bozdoz/',
    title: 'Github',
    icon: 'github'
  },
  {
    href: 'https://stackoverflow.com/users/488784/bozdoz',
    title: 'Stack Overflow',
    icon: 'stack-overflow'
  },
  {
    href: 'https://codepen.io/bozdoz/',
    title: 'CodePen',
    icon: 'codepen'
  },
  {
    href: 'https://www.strava.com/athletes/637243',
    title: 'Strava',
    image: {
      src: '/images/strava-white.svg',
      alt: 'Strava',
      height: 10
    }
  }
];

export default () => (
  <nav id="social-nav" aria-label="Social Media">
    {list.map(({ href, title, icon, image }) => (
      <li key={href} title={title}>
        <a href={href} target="_blank" rel="noreferrer">
          {icon && <i className={`fa fa-${icon}`} aria-hidden="true" />}
          {image && <img {...image} />}
          <span className="screen-reader">{title}</span>
        </a>
        {' '}
      </li>
    ))}
  </nav>
);
