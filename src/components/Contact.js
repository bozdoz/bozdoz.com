import React from 'react';

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
		text: 'Benjamin J DeLong',
		pre_text: ' LinkedIn: ',
		icon: 'linkedin'
	}
];

const Contact = () => (
	<ul className="contact-list">
		{contact_links.map(({ href, text, pre_text, icon }) => (
			<li key={text}>
				{icon &&
					<i className={`fa fa-${icon}`}></i>} 
					<span className="pretext">{pre_text}</span>
					<a href={href} target="_blank">{text}</a>
			</li>
		))}
	</ul>
);

export default Contact;