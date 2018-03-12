import path from 'path';
import express from 'express';
import React from 'react';
import { renderToString as render, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import ServerTemplate from './components/ServerTemplate';
import Sitemap from './components/Sitemap';
import api from './api';

const PORT = 8005;
const app = express();

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, '../public')));

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

/**
* app listen methods; required for executing AFTER 
* webpack script in dev-server.js
*
* @return null
*/
function createApp () {
	// app offloads some requests back to server
	app.use('/api', api);

	app.get('/sitemap.xml', function (req, res) {
		let content = '<?xml version="1.0" encoding="UTF-8"?>';
		content += renderToStaticMarkup(
			<Sitemap />
		);
		res.header('Content-Type','text/xml')
			.status(200)
			.send(content);
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

export { app, createApp };