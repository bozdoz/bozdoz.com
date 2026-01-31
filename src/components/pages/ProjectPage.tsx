import { Link, useParams } from 'react-router-dom';

import NotFoundPage from './NotFoundPage';
import AsyncPage from '../AsyncPage';

/**
 * because project page is an ambiguous match, it requires
 * a lookup first to see if the markdown file can be found;
 * defaults to NotFoundPage
 */
const ProjectPage = () => {
  const params = useParams();

  return (
    <AsyncPage
      className="project-page"
      breadcrumbs={[
        ['Home', '/'],
        ['Projects', '/projects'],
      ]}
      source={`/projects/${params.id}`}
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
    </AsyncPage>
  );
};

export default ProjectPage;
