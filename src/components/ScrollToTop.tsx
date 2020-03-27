import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

/**
 * It scrolls page and #main element to the top
 * when a new route is mounted
 */

class ScrollToTop extends React.Component<RouteComponentProps<{}>> {
  componentDidMount() {
    if (this.props.location.hash) {
      // one time reset location when
      // assets are loaded
      window.addEventListener('load', () => {
        window.location = window.location;
      });
    }
  }

  componentDidUpdate({ history }: RouteComponentProps<{}>) {
    if (history.action === 'PUSH' || history.action === 'REPLACE') {
      // new link goes to top
      document.querySelector('#main')!.scrollTo(0, 0);
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollToTop);
