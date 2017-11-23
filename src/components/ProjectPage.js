import React from 'react';
import getMarkDown from './getMarkDown';
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
	const markdown = getMarkDown(props.match.url);

	if (markdown.attributes.status === 404) {
		return (
			<NotFoundPage markdown={markdown} {...props} />
		);
	}

	return (
		<PlainPage 
			className="project-page" 
			breadcrumbs={[
				'Home', '/',
				'Projects', '/projects'
			]}
			markdown={markdown}
			{...props} />
	);
};

export default ProjectPage;