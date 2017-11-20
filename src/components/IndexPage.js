import React from 'react';
import { Link } from 'react-router-dom';
import Content from './Content';
import TagList from './TagList';

const tags = [
	'JavaScript',
	'GIS',
	'Python',
	'PHP',
	'WordPress',
	'Django',
	'PhoneGap',
	'Varnish',
	'CSS3',
	'React',
	'Node.js',
];

const IndexPage = (props) => (
	<Content source="index" {...props}>
		<div className="container">
			<p>Tech I've dabbled in:</p>
			<TagList tags={tags} />
		</div>
		<div className="container">
			<p>Check out <Link to="/projects">my projects</Link> for more!</p>
		</div>
	</Content>
);

export default IndexPage;