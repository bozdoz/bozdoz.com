import React from 'react';

const list = [
	{
		href: 'https://twitter.com/bozdoz/',
		title: 'Twitter',
		icon: 'twitter'
	},
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
		image: '/images/strava-white.svg'
	},
];

const NavFooter = () => (
	<ul id="nav-footer">
		{list.map(({href, title, icon, image}) => (
			<li key={href} title={title}>
				<a href={href} target="_blank">
					{icon &&
						<i className={`fa fa-${icon}`} aria-hidden="true"></i>
					}
					{image &&
						<img height="10" src={image} />
					}
				</a>
			</li>
		))}
	</ul>
);

export default NavFooter;