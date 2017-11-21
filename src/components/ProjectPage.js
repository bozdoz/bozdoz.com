import React from 'react';
import PlainPage from './PlainPage';

const ProjectPage = (props) => (
	<PlainPage 
		className="project-page" 
		breadcrumbs={[
			'Home', '/',
			'Projects', '/projects'
		]}
		{...props} />
);

export default ProjectPage;