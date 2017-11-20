import React from 'react';
import PropTypes from 'prop-types';

const TagList = ({tags}) => (
	<ul className="tag-list">
		{tags.map((tag) => (
			<li key={tag}>#{tag}</li>
		))}
	</ul>
);

TagList.propTypes = {
	tags: PropTypes.array.isRequired
};

export default TagList;