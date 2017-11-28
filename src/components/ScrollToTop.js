import React from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.Component {
    componentDidMount () {
        if (this.props.location.hash) {
            // one time reset location when
            // assets are loaded
            window.addEventListener('load', () => {
                window.location = window.location;
            });
        }
    }

    componentDidUpdate ({ history }) {
        if (history.action === 'PUSH') {
            // new link goes to top
            document.querySelector('#main').scrollTo(0, 0);
	        window.scrollTo(0, 0);
    	}
    }

    render() {
        return null;
    }
}

export default withRouter(ScrollToTop);