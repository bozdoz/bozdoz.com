import React from 'react';
import Content from './Content';

const ProjectPage = (props) => (
	<Content 
		className="project-page" 
		source={props.match.url} 
		breadcrumbs={[
			'Home', '/',
			'Projects', '/projects'
		]}
		{...props} />
);

export default ProjectPage;