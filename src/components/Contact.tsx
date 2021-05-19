import React from 'react';

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

const Contact = () => (
  <nav className="container" aria-label="Contact info">
    <ul className="contact-list">
      {contact_links.map(({ href, text, pre_text, icon }) => (
        <li key={text}>
          <span>{pre_text}</span>
          <a href={href} target="_blank" rel="noreferrer" aria-label={text}>
            <i className={`fa fa-${icon}`} aria-hidden />
            {text}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default Contact;
