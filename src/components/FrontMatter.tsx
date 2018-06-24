import * as React from 'react';
import * as axios from 'axios';
import * as path from 'path';

import MarkDown from './MarkDown';
import TagList from './TagList';
import PageLayout from './PageLayout';
import LoadingPage from './LoadingPage';

const cache = {};

/**
 * Gets markdown formatted page content from server
 *
 * @param string page
 * @param object req 	created by axios.CancelToken.source()
 * @return Promise
 */
const getPage = (page: string, req: any) => {
  return new Promise(resolve => {
    if (cache[page]) {
      resolve(cache[page]);
    } else {
      (axios as any)
        .get(path.join('/', 'pages', `${page}`), {
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          },
          cancelToken: req.token
        })
        .then((request: any) => request.data)
        .then((data: FrontMatterObject) => {
          cache[page] = data;
          resolve(data);
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }
  });
};

interface FrontMatterAttributes {
  link: string;
  description: string;
  show_description: boolean;
  tags: string[];
  subtitle: string;
}

interface FrontMatterObject {
  body: string;
  attributes: FrontMatterAttributes;
}

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
  req: any;

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

  componentDidMount() {
    // no page
    if (!this.state.page) {
      // get the page from the source!
      // and a cancel token from axios
      this.req = (axios as any).CancelToken.source();

      getPage(this.props.source, this.req).then((page: FrontMatterObject) =>
        this.setState({ page })
      );
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
        <a target="_blank" href={link}>
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
