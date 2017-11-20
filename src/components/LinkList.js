import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

const LinkList = ({list, is_nav}) => {
	return list.map(({href, text, title}) => (
		<li key={href}>
			{is_nav ? 
			<NavLink 
				to={href} 
				title={title || text}
				activeClassName="active">
				<span className="nav-text">{text}</span>
			</NavLink>
			:
			<Link to={href} title={title || text}>
				<span className="nav-text">{text}</span>
			</Link>
			}
		</li>
	));
};

LinkList.propTypes = {
	list: PropTypes.array.isRequired,
	is_nav: PropTypes.bool
};

export default LinkList;