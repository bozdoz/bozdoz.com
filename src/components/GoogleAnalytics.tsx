import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { GA_TRACKING_ID } from '../data/site_variables';

class GoogleAnalytics extends React.Component<RouteComponentProps<{}>> {
    componentWillUpdate (props: RouteComponentProps<{}>) {
        const {
            location,
            history
        } = props
        const gtag = (window as any).gtag;

        if (location.pathname === this.props.location.pathname) {
            // don't log identical link clicks (nav links likely)
            return;
        }

        if (history.action === 'PUSH' &&
            typeof(gtag) === 'function') {
            gtag('config', GA_TRACKING_ID, {
                'page_title': document.title,
                'page_location': window.location.href,
                'page_path': location.pathname
            });
        }
    }

    render () {
        return null;
    }
}

export default withRouter(GoogleAnalytics);