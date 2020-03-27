import * as React from 'react';
import axios, { CancelTokenSource } from 'axios';

import MarkDown from './MarkDown';
import TagList from './TagList';
import PageLayout from './layouts/PageLayout';
import LoadingPage from './pages/LoadingPage';
import { FrontMatterObject, cache, getPage } from './getPage';

interface Props {
  page: FrontMatterObject;
  staticContext?: {
    page: FrontMatterObject;
  };
  source: string;
  className?: string;
  title: string;
}

interface State {
  page: FrontMatterObject;
}

class FrontMatter extends React.Component<Props, State> {
  req: CancelTokenSource | undefined;

  constructor(props: Props) {
    super(props);

    let page = props.page || null;

    if (props.staticContext) {
      // server-side rendering already has it
      page = props.staticContext.page;
    } else if (
      typeof window !== 'undefined' &&
      (window as any).__INITIAL_HTML__
    ) {
      // client-side initial render
      // gets variable set in ServerTemplate.js
      page = (window as any).__INITIAL_HTML__;

      // destroy variable and script
      delete (window as any).__INITIAL_HTML__;
      let script = document.getElementById('initial-state');
      script!.parentNode!.removeChild(script as HTMLElement);

      // cache page
      cache[props.source] = page;
    }

    this.state = { page };
  }

  async componentDidMount() {
    // no page
    if (!this.state.page) {
      // get the page from the source!
      // and a cancel token from axios
      this.req = axios.CancelToken.source();

      const page = await getPage(this.props.source, this.req);

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

    let { subtitle } = attributes;

    if (link && subtitle) {
      subtitle = (
        <a target="_blank" href={link} rel="noreferrer">
          {subtitle}
        </a>
      ) as any;
    }

    return (
      <PageLayout {...attributes} subtitle={subtitle} {...this.props}>
        {description &&
          show_description !== false && (
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
