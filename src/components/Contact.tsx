import * as React from 'react';

const contact_links = [
  {
    href: 'mailto:ben@bozdoz.com?subject=Your%20Site',
    text: 'ben@bozdoz.com',
    pre_text: ' Email: ',
    icon: 'envelope'
  },
  {
    href: 'https://www.linkedin.com/in/benjaminjdelong/',
    text: 'Benjamin DeLong',
    pre_text: ' LinkedIn: ',
    icon: 'linkedin'
  }
];

export default () => (
  <section className="container">
    <ul className="contact-list">
      {contact_links.map(({ href, text, pre_text, icon }) => (
        <li key={text}>
          <i className={`fa fa-${icon}`} />
          <span className="pretext">{pre_text}</span>
          <a href={href} target="_blank" rel="noreferrer">
            {text}
          </a>
        </li>
      ))}
    </ul>
  </section>
);