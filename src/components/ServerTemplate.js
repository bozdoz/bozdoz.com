import React from 'react';
import { Route } from 'react-router-dom';
import App from './App';
import Head from './Head';
import { GA_TRACKING_ID } from '../data/site_variables';
import fs from 'fs';
import fm from 'front-matter';
import path from 'path';

const env = process.env.NODE_ENV;

let pagedir = path.join(__dirname);

if (env !== 'production') {
	// path changes when bundled
	pagedir = path.join(pagedir, '..');
}

pagedir = path.join(pagedir, 'pages');

export { pagedir };

/**
* gets frontmatter/markdown from given page
*
* @param Object source
* @return Object|Null
*/
const getMarkdown = (_source) => {
	let source = _source;

	try {
		let content = fs.readFileSync(path.join(pagedir, `${source}.md`), 'utf8');
		return fm(content);
	} catch (e) {
		// can't find a file; return 404
		return getMarkdown('404');
	}
};
	
/**
* Sets Initial HTML (not needed if page.body is undefined)
* Used and destroyed in FrontMatter.js
*/
export const InitialHTML = ({page}) => (
	<script 
		id="initial-state"
		dangerouslySetInnerHTML={{
		__html: `window.__INITIAL_HTML__ = ${JSON.stringify(page)};`
		}} />
);

/**
* Indicates 404 Not Found
* Used and destroyed in ProjectPage.js
*/
export const Is404 = () => (
	<script 
		id="404-script"
		dangerouslySetInnerHTML={{
		__html: `window.__IS_404__ = true;`
		}} />
);

export const getPage = ({ location, staticContext }) => {
	/*
	todo: tags and tag pages
	*/
	let page;
	if (location.pathname === '/') {
		page = getMarkdown('index');
	} else {
		page = getMarkdown( location.pathname ); 
	}
	staticContext.page = page;

	if (!page.attributes) {
		page.attributes = {};
	} 
	return page;
};

const ServerTemplate = () => (
	<html lang="en" dir="ltr">
		<Route render={(props) => {
			const page = getPage(props);
			const atts = page.attributes;
			// conditionally load intial HTML
			// and 404 pages
			return (
				<Head {...atts}>
					{page.body && 
						<Route render={() => (
							<InitialHTML page={page} />
						)} />
					}
					{atts.status === 404 &&
						<Route component={Is404} />
					}
				</Head>
			);
		}} />
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
			<script src="/js/prism.js" defer />
		</body>
	</html>
);

export default ServerTemplate;