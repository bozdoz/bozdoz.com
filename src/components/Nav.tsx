import * as React from 'react';
import { NavLink } from 'react-router-dom';

const list = [
	{
		href: '/projects',
		text: 'Projects'
	},
	{
		href: '/about',
		text: 'About'
	}
];

const Nav = () => (
	<ul id="side-nav">
		{list.map(({href, text}) => (
			<li key={href}>
				<NavLink 
					to={href} 
					title={text}
					activeClassName="active">
					<span className="nav-text">{text}</span>
				</NavLink>
			</li>
		))}
	</ul>
);

export default Nav;