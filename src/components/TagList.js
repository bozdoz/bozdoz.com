import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TagList = ({tags}) => (
	<ul className="tag-list container">
		{tags.map((tag) => {
			let slug = tag.replace(/\s/g, '-').toLowerCase();
			return (
				<li key={tag}>
					<Link to={`/tags/${slug}`}>{tag}</Link>
				</li>
			)
		})}
	</ul>
);

TagList.propTypes = {
	tags: PropTypes.array.isRequired
};

export default TagList;