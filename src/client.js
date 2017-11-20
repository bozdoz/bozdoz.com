import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import './css/style.scss';
import { GA_TRACKING_ID } from './config';

const Client = () => (
	<Router>
		<App />
	</Router>
);

hydrate(
	<Client />,
	document.getElementById('page')
);

// google analytics
window.dataLayer = window.dataLayer || [];
window.gtag = function gtag () {dataLayer.push(arguments)};

gtag('js', new Date());
gtag('config', GA_TRACKING_ID);

// hot reloading
if (module.hot) {
	module.hot.accept();
}