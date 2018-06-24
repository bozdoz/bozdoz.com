import * as React from 'react';

interface Props {
	tags: string[]
}

const TagList = ({ tags }: Props) => (
	<ul className="tag-list container">
		{tags.map((tag) => (
			<li key={tag}>#{tag}</li>
		))}
	</ul>
);

export default TagList;