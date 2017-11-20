import React from 'react';
import { Route } from 'react-router-dom';
import App from './App';
import Head from './Head';
import getPage from './getPage';
import { GA_TRACKING_ID } from '../config';

const getHead = ({ match }) => {
	let page;
	if (match.path === '/') {
		page = getPage('index');
	} else {
		page = getPage( match.url ); 
	}
	page = page.attributes;
	return (
		<Head {...page} />
	)
};

const Template = () => (
	<html lang="en">
		<Route render={getHead} />
		<body>
			<div id="page">
				<App />
			</div>
			<script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}></script>
			<script src="/js/main.js"></script>
			<script src="/prism/prism.js" defer></script>
		</body>
	</html>
);

export default Template;