import * as React from 'react';
import { Link } from 'react-router-dom';

import NotFoundPage from './NotFoundPage';
import FrontMatter from '../FrontMatter';

/**
 * because project page is an ambiguous match, it requires
 * a lookup first to see if the markdown file can be found;
 * defaults to NotFoundPage
 */
const ProjectPage = (props: any) => {
  // client-side render
  if (typeof window !== 'undefined' && window.__IS_404__) {
    // gets variable set in ServerTemplate.js
    const script = document.getElementById('404-script');

    // destroy variable and script
    delete window.__IS_404__;
    if (script && script.parentNode) {
      script.parentNode.removeChild(script);
    }

    return <NotFoundPage {...props} />;
  }

  // server-side render
  if (props.staticContext) {
    // set in ./ServerTemplate.js
    const { page } = props.staticContext;

    if (page.attributes.status === 404) {
      return <NotFoundPage page={page} {...props} />;
    }
  }

  return (
    <FrontMatter
      className="project-page"
      breadcrumbs={[['Home', '/'], ['Projects', '/projects']]}
      {...props}
    >
      <div className="container">
        <hr />
        <Link to={`/projects`} className="btn btn-default">
          <i
            className="fa fa-chevron-left fa-fw color-grey font-sm"
            aria-hidden
          />
          &nbsp; Back to Projects
        </Link>
      </div>
    </FrontMatter>
  );
};

export default ProjectPage;
