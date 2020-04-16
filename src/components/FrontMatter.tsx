import * as React from 'react';
import axios, { CancelTokenSource } from 'axios';

import MarkDown from './MarkDown';
import TagList from './TagList';
import PageLayout from './layouts/PageLayout';
import LoadingPage from './pages/LoadingPage';
import { cache, getPage } from './getPage';
import { RouteComponentProps, StaticContext } from 'react-router';

interface RouteContext extends StaticContext {
  page: FrontMatterObject;
}

interface Props extends RouteComponentProps<{}, RouteContext> {
  page: FrontMatterObject;
  source?: string;
  className?: string;
  title: string;
}

interface State {
  page: FrontMatterObject | null;
}

class FrontMatter extends React.Component<Props, State> {
  req: CancelTokenSource | undefined;

  get source() {
    return this.props.source || this.props.match.url;
  }

  constructor(props: Props) {
    super(props);

    let page = props.page || null;

    if (props.staticContext) {
      // server-side rendering already has it
      page = props.staticContext.page;
    } else if (typeof window !== 'undefined' && window.__INITIAL_HTML__) {
      // client-side initial render
      // gets variable set in ServerTemplate.js
      page = window.__INITIAL_HTML__;

      // destroy variable and script
      delete window.__INITIAL_HTML__;
      const script = document.getElementById('initial-state');

      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }

      // cache page
      cache[this.source] = page;
    }

    this.state = { page };
  }

  async componentDidMount() {
    // no page
    if (!this.state.page) {
      // get the page from the source!
      // and a cancel token from axios
      this.req = axios.CancelToken.source();

      const page = await getPage(this.source, this.req);

      this.setState({ page });
    }
  }

  componentWillUnmount() {
    // abort ajax request
    if (this.req) {
      this.req.cancel();
    }
  }

  render() {
    const { page } = this.state;

    // no page while ajax retrieves
    // between client routes
    if (page === null) {
      return <LoadingPage className={this.props.className} />;
    }

    const { body, attributes } = page;

    const { link, description, show_description, tags } = attributes;

    let subtitle: React.ReactChild = attributes.subtitle;

    if (link && subtitle) {
      subtitle = (
        <a target="_blank" href={link} rel="noreferrer">
          {subtitle}
        </a>
      );
    }

    return (
      <PageLayout {...attributes} subtitle={subtitle} {...this.props}>
        {description &&
          show_description && (
            <div className="page-description">
              <p>{description}</p>
            </div>
          )}
        {tags && <TagList tags={tags} />}
        {body && <MarkDown content={body} />}
        {this.props.children}
      </PageLayout>
    );
  }
}

export default FrontMatter;
