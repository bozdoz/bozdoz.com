import * as React from 'react';

const list = [
  {
    href: 'https://github.com/bozdoz/',
    title: 'GitHub',
    src: '/images/github.svg'
  },
  {
    href: 'https://stackoverflow.com/users/488784/bozdoz',
    title: 'Stack Overflow',
    src: '/images/stack-overflow.svg'
  },
  {
    href: 'https://codepen.io/bozdoz/',
    title: 'CodePen',
    src: '/images/codepen.svg'
  },
  {
    href: 'https://www.strava.com/athletes/637243',
    title: 'Strava',
    src: '/images/strava.svg'
  }
];

const SocialNav = () => (
  <nav id="social-nav" aria-label="Social Media">
    {list.map(({ href, title, src }) => (
      <React.Fragment key={href}>
        <a title={title} href={href} target="_blank" rel="noreferrer">
          <img src={src} alt={title} height="30" />
          <span className="screen-reader">{title}</span>
        </a>{' '}
      </React.Fragment>
    ))}
  </nav>
);

export default SocialNav;
