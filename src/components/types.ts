import { RouteComponentProps, StaticContext } from 'react-router';

interface RouteContext extends StaticContext {
  page: FrontMatterObject;
  is404: boolean;
}

export type RouteProps = RouteComponentProps<{}, RouteContext>;
