import * as React from 'react';

const list = [
  {
    href: 'https://github.com/bozdoz/',
    title: 'GitHub',
    src: '/images/github.svg'
  },
  {
    href: 'https://codepen.io/bozdoz/',
    title: 'CodePen',
    src: '/images/codepen.svg'
  },
  {
    href: 'https://stackoverflow.com/users/488784/bozdoz',
    title: 'Stack Overflow',
    src: '/images/stack-overflow.svg'
  },
  {
    href: 'https://www.strava.com/athletes/637243',
    title: 'Strava',
    src: '/images/strava.svg'
  }
];

const SocialNav = () => (
  <nav id="social-nav" aria-label="my social media links">
    {list.map(({ href, title, src }) => (
      <React.Fragment key={href}>
        <a
          aria-label={title}
          title={title}
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          <img src={src} aria-hidden alt="" height="48" />
        </a>{' '}
      </React.Fragment>
    ))}
  </nav>
);

export default SocialNav;
