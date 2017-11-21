import React from 'react';
import PlainPage from './PlainPage';
import { Link } from 'react-router-dom';

const list = [
	{
		id: 'alberta-tomorrow',
		text: 'Alberta Tomorrow',
		description: 'An educational, online land-use planning tool'
	},
	{
		id: 'luke-buxton',
		text: 'Luke Buxton',
		description: 'Art director, animator, production, designer'

	},
	{
		id: 'typewrite-something',
		text: 'Typewrite Something',
		description: 'An online typewriter simulator, web app and mobile (Android) app.'
	},
	{
		id: 'leaflet-map',
		text: 'Leaflet Map',
		description: 'Generate a LeafletJS map on your WordPress site with simple shortcodes'
	},
];

const Projects = (props) => (
	<PlainPage {...props}>
		<div className="container">
			<ul className="project-list">
				{list.map(({id, text, description}) => (
					<li key={id} className="pb-4">
						<Link to={`/projects/${id}`} className="media">
							<img 
								className="mr-4" 
								src={`/images/projects/${id}-sq.jpg`} 
								alt={text} 
								title={text} />
							<div className="media-body">
								<h5>{text}</h5>
								<p>{description}</p>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	</PlainPage>
);

export default Projects;