import React from 'react';
import { Route } from 'react-router-dom';
import App from './App';
import Head from './Head';
import getMarkDown from './getMarkDown';
import { GA_TRACKING_ID } from '../config';

const env = process.env.NODE_ENV;

const getHead = ({ location }) => {
	let page;
	if (location.pathname === '/') {
		page = getMarkDown('index');
	} else {
		page = getMarkDown( location.pathname ); 
	}
	page = page.attributes || {};

	return (
		<Head {...page} />
	)
};

const Template = () => (
	<html lang="en" dir="ltr">
		<Route render={getHead} />
		<body>
			<div id="page">
				<App />
			</div>
			{env === 'production' &&
				<script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
			}
			<script src="/js/main.js" />
			<script src="/prism/prism.js" defer />
		</body>
	</html>
);

export default Template;