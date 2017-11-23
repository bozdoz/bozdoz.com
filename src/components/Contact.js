import React from 'react';

const contact_links = [
	{
		href: 'https://twitter.com/bozdoz/',
		text: '@bozdoz',
		pre_text: 'Twitter: '
	},
	{
		href: 'mailto:ben@bozdoz.com?subject=Your Site',
		text: 'ben@bozdoz.com',
		pre_text: 'Email: '
	}
]

const Contact = () => (
	<ul>
		{contact_links.map(({ href, text, pre_text }) => (
			<li key={text}>
				{pre_text}<a href={href} target="_blank">{text}</a>
			</li>
		))}
	</ul>
);

export default Contact;