import React from 'react';
import LinkList from './LinkList';

const tl_routes = [
	{
		href: '/projects',
		text: 'Projects'
	},
	{
		href: '/about',
		text: 'About'
	},
	/*{
		href: '/resume',
		text: 'Resume',
	},*/
];

const Nav = () => (
	<ul id="side-nav">
		<LinkList list={tl_routes} is_nav={true} />
	</ul>
);

export default Nav;