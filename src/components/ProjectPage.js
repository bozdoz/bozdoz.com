import React from 'react';
import NotFoundPage from './NotFoundPage';
import PlainPage from './PlainPage';

/**
* because project page is an ambiguous match, it requires
* a lookup first to see if the markdown file can be found;
* defaults to NotFoundPage
*
* @param Object props
* @return Component NotFoundPage|PlainPage
*/
const ProjectPage = (props) => {
	if (props.staticContext) {
		// server-side 
		const { page } = props.staticContext;

		if (page.attributes.status === 404) {
			return (
				<NotFoundPage page={page} {...props} />
			);
		}
	}

	return (
		<PlainPage 
			className="project-page" 
			breadcrumbs={[
				'Home', '/',
				'Projects', '/projects'
			]}
			{...props} />
	);
};

export default ProjectPage;