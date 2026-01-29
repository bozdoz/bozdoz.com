import { RouteComponentProps, StaticContext } from 'react-router-dom';

interface RouteContext extends StaticContext {
  page: FrontMatterObject;
  is404: boolean;
}

export type RouteProps = RouteComponentProps<{}, RouteContext>;
