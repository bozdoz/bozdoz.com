import * as React from 'react';

const contact_links = [
  {
    href: 'https://twitter.com/bozdoz/',
    text: '@bozdoz',
    pre_text: ' Twitter: ',
    icon: 'twitter'
  },
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

const Contact = () => (
  <div className="container">
    <ul className="contact-list">
      {contact_links.map(({ href, text, pre_text, icon }) => (
        <li key={text}>
          <i className={`fa fa-${icon}`} />
          <span className="pretext">{pre_text}</span>
          <a href={href} target="_blank">
            {text}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Contact;
