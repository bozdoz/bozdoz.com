import React from 'react';
import { Route } from 'react-router-dom';
import App from './App';
import Head from './Head';
import { GA_TRACKING_ID } from '../config';
import fs from 'fs';
import fm from 'front-matter';
import path from 'path';

const env = process.env.NODE_ENV;

/**
* gets frontmatter/markdown from given page
*
* @param Object source
* @return Object|Null
*/
const getMarkdown = (_source) => {
	let source = _source;

	try {
		let content;
		let _path = path.join(__dirname);

		if (env !== 'production') {
			// path changes when bundled
			_path = path.join(_path, '..');
		}

		content = fs.readFileSync(path.join(_path, 'pages', `${source}.md`), 'utf8');
		return fm(content);
	} catch (e) {
		// can't find a file; return 404
		return getMarkdown('404');
	}
};
	
let page;
const getHead = ({ location, staticContext }) => {
	if (location.pathname === '/') {
		page = getMarkdown('index');
	} else {
		page = getMarkdown( location.pathname ); 
	}
	staticContext.page = page;

	const atts = page.attributes || {};

	return (
		<Head {...atts} />
	);
};

/**
* Sets Initial HTML
* Used and destroyed in FrontMatter.js
*/
const InitialHTML = () => (
	<script 
		id="initial-state"
		dangerouslySetInnerHTML={{
		__html: `window.__INITIAL_HTML__ = ${JSON.stringify(page)};`
		}} />
);

const ServerTemplate = () => (
	<html lang="en" dir="ltr">
		<Route render={getHead} />
		<Route component={InitialHTML} />
		<body>
			<noscript>
				You need to enable JavaScript to run this app.
			</noscript>
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

export default ServerTemplate;