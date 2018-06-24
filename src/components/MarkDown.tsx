import * as React from 'react';
import { Redirect } from 'react-router';
import * as marked from 'marked';

interface Props {
  content: string;
}

interface State {
  redirect?: string;
}

class MarkDown extends React.Component<Props, State> {
  container: HTMLElement | null;
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  handleOnClick(href: string) {
    this.setState({
      redirect: href
    });
  }

  componentDidMount() {
    const host = new RegExp(`^https?://${window.location.host}`);

    /*
		jest renderer doesn't create
	 	this.container (apparently)
	 	*/
    if (!this.container) {
      return;
    }

    // change links to use react router
    // or open new tabs
    (this.container.querySelectorAll('a') as any).forEach(
      (a: HTMLAnchorElement) => {
        if (a.href.match(host)) {
          // add redirect handler
          a.addEventListener('click', e => {
            e.preventDefault();
            this.handleOnClick((e.target as any).getAttribute('href'));
          });
        } else {
          // otherwise push to a new tab
          a.target = '_blank';
        }
      }
    );

    // style codeblocks;
    if (typeof (window as any).Prism !== 'undefined') {
      (window as any).Prism.highlightAll();
    }

    // add links to headers
    ['h1', 'h2', 'h3', 'h4', 'h5'].forEach(a => {
      (this.container!.querySelectorAll(a) as any).forEach(
        (header: HTMLElement) => {
          const anchor = document.createElement('a');
          anchor.className = `header-link`;
          anchor.href = `#${header.id}`;
          anchor.innerHTML = '<i class="fa fa-link" aria-hidden="true"></i>';
          header.appendChild(anchor);
        }
      );
    });

    // copy img alt text to title
    (this.container.querySelectorAll('img') as any).forEach(
      (img: HTMLImageElement) => {
        img.title = img.alt;
      }
    );

    // todo: add header links to top of `this.container`
    // as a list of skip-to links
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />;
    }
    return (
      <div
        ref={a => {
          this.container = a;
        }}
        className="container markdown"
        dangerouslySetInnerHTML={{
          __html: marked.parse(this.props.content)
        }}
      />
    );
  }
}

export default MarkDown;
