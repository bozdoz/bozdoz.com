import * as React from 'react';
import { Redirect } from 'react-router';
import * as marked from 'marked';

interface Props {
  content: string;
}

interface State {
  redirect?: string;
}

/**
 * It manipulates the HTML elements generated from markdown
 */
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
    this.container.querySelectorAll('a').forEach(a => {
      if (a.href.match(host)) {
        // add redirect handler to local links
        a.addEventListener('click', e => {
          e.preventDefault();
          this.handleOnClick((e.target as typeof a).getAttribute('href')!);
        });
      } else {
        // otherwise push to a new tab
        a.target = '_blank';
        a.rel = 'noreferrer';
      }
      // add text content to label
      if (a.textContent) {
        a.setAttribute('aria-label', a.textContent);
      }
    });

    // style codeblocks;
    if (typeof window !== 'undefined' && window.Prism) {
      window.Prism.highlightAll();
    }

    // add links to headers
    this.container.querySelectorAll('h1, h2, h3, h4, h5').forEach(header => {
      const anchor = document.createElement('a');
      anchor.className = `header-link`;
      anchor.href = `#${header.id}`;
      anchor.innerHTML = '<i class="fa fa-link" aria-hidden="true"></i>';
      header.insertBefore(anchor, header.firstChild);
    });

    this.container.querySelectorAll('img').forEach(img => {
      // copy img alt text to title
      img.title = img.alt;
      // add a class to paragraphs with images for sizing
      if (img.parentElement) {
        img.parentElement.className = 'image';
      }
    });

    // make font awesome hidden to screen readers
    this.container.querySelectorAll('i.fa').forEach(elem => {
      elem.setAttribute('aria-hidden', 'true');
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />;
    }

    return (
      <section
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
