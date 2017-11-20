import React from 'react';
import Content from './Content';
import LinkList from './LinkList';

const list = [
	{
		href: '/projects/alberta-tomorrow',
		text: 'Alberta Tomorrow, Online Mapping Tool'
	},
	{
		href: '/projects/luke-buxton',
		text: 'Luke Buxton, Illustrator'
	},
	{
		href: '/projects/typewrite-something',
		text: 'Typewrite Something, A typewriter simulator'
	},
	{
		href: '/projects/leaflet-map',
		text: 'Leaflet Map, a WordPress plugin'
	},
];

const Projects = (props) => (
	<Content source="projects" {...props}>
		<div className="container">
			<ul className="project-list">
				<LinkList list={list} />
			</ul>
		</div>
	</Content>
);

export default Projects;