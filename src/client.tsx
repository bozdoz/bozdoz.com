import React from 'react';
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

render(<Client />, document.getElementById('app'));

// google analytics
if (GA_TRACKING_ID) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer!.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID);

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash && hash !== '#') {
      window.gtag!({
        hash,
        event: 'hashchange'
      });
    }
  });
}

// hot reloading
if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
