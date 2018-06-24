import * as React from 'react';
import { hydrate as render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';
import './css/style.scss';
import { GA_TRACKING_ID } from './data/site_variables';

const Client = () => (
  <Router>
    <App />
  </Router>
);

render(<Client />, document.getElementById('page'));

// google analytics
(win => {
  win.dataLayer = win.dataLayer || [];
  win.gtag = function gtag() {
    win.dataLayer.push(arguments);
  };

  win.gtag('js', new Date());
  win.gtag('config', GA_TRACKING_ID);

  win.addEventListener('hashchange', function() {
    var hash = win.location.hash;
    if (hash && hash !== '#') {
      win.gtag({
        event: 'hashchange',
        hash: hash
      });
    }
  });
})(window as any);

// hot reloading
if (module.hot) {
  module.hot.accept();
}
