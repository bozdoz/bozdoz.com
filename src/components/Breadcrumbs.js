import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Breadcrumbs = (props) => {
	const list = props.list;

	let links = [];
	
	for (let i = 0, len = list.length; i < len; i+=2) {
		let name = list[i];
		let link = list[i + 1];

		if (link) {
			links.push((
				<li className="breadcrumb-item" 
					key={name}>
					<Link to={link}>{name}</Link>
				</li>
			));
		} else {
			// current page, no link
			links.push((
				<li className="breadcrumb-item active" 
					key={name} 
					aria-current="page">
					{name}
				</li>
			));
		}
	}

	return (
		<nav aria-label="breadcrumb" 
			role="navigation">
			<ol className="breadcrumb">
				{links}
			</ol>
		</nav>
	);
};

Breadcrumbs.propTypes = {
	list: PropTypes.array.isRequired
};

export default Breadcrumbs;