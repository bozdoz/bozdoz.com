import path from 'path';
import express from 'express';
import helmet from 'helmet';
import React from 'react';
import { renderToString as render } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import ServerTemplate from './components/ServerTemplate';
import fs from 'fs';
import fm from 'front-matter';

const PORT = 8001;
const app = express();

app.use(helmet());

app.use(express.static(path.join(__dirname, 'static')));

// it removes trailing slash
app.use(function(req, res, next) {
	const _path = req.path;
	if (_path.length > 1 && /\/$/.test(_path)) {
		const query = req.url.slice(_path.length);
		res.redirect(301, _path.slice(0, -1) + query);
	} else {
		next();
	}
});

const getMarkdown = (page) => {
	const filename = path.join(__dirname, 'pages', `${page}.md`);
	const content = fs.readFileSync(filename, 'utf8');

	return fm(content);
};

const intBetween = (min, max) => (
	Math.round((Math.random() * (max - min)) + min)
);

// simulate longer loads
const simulateLoad = (fnc) => {
	setTimeout(fnc, intBetween(0, 2000));
};

/**
* app listen methods; required for executing AFTER 
* webpack script in dev-server.js
*
* @return null
*/
function createApp () {
	app.get('/pages/*', function (req, res) {
		const page = req.params['0'];
		let status = 200;
		let content = 'not ajax';

		try {
			if (req.xhr) {
				content = getMarkdown(page);
			}
		} catch (e) {
			// can't find a file; return 404
			content = getMarkdown('404');
			status = 404;
		}

		// simulateLoad(() => {
		res.status(status).send(content);
		//});
	});

	app.get('*', function (req, res) {
		const context = {};
		let status = 200;
		let content = '<!doctype html>';

		content += render(
			<Router location={req.url} context={context}>
				<ServerTemplate />
			</Router>
		);

		if (context.url) {
			return res.redirect(302, context.url);
		}

		if (context.is404) {
			status = 404;
		}

		res.status(status).send(content);
	});

	app.listen(PORT, function() {
	    console.log(`Live at http://localhost:${PORT}/`);
	});
}

if (process.env.NODE_ENV === 'production') {
	createApp();
}

export { app, createApp, getMarkdown };