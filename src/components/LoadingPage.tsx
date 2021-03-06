import * as React from 'react';

import Breadcrumbs from './Breadcrumbs';

interface Props {
  className?: string;
}

interface State {
  loading: boolean;
}

class LoadingPage extends React.Component<Props, State> {
  loading_timeout: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    // set loading to true
    // if component has been mounted too long
    this.loading_timeout = window.setTimeout(() => {
      this.setState({
        loading: true
      });
    }, 500);
  }

  componentWillUnmount() {
    window.clearTimeout(this.loading_timeout);
  }

  render() {
    const { loading } = this.state;

    let className = 'loading page';

    if (this.props.className) {
      className += ` ${this.props.className}`;
    }

    if (!loading) {
      // render blank page if
      // load time is small enough
      return <article className={className} />;
    }

    return (
      <article className={className}>
        <header>
          <div className="header-image" />
          <div className="header-title">
            <h1>&nbsp;</h1>
            <h2>&nbsp;</h2>
          </div>
        </header>
        <Breadcrumbs />
        <div className="container markdown">&nbsp;</div>
      </article>
    );
  }
}

export default LoadingPage;
