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

render(
	<Client />,
	document.getElementById('page')
);

// google analytics
window.dataLayer = window.dataLayer || [];
window.gtag = function gtag () {dataLayer.push(arguments)};

gtag('js', new Date());
gtag('config', GA_TRACKING_ID);

window.addEventListener('hashchange', function () {
	var hash = window.location.hash;
	if (hash && hash !== '#') {
		gtag({
			event: 'hashchange',
			hash: hash
		});
	}
});

// hot reloading
if (module.hot) {
	module.hot.accept();
}