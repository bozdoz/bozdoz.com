import path from 'path';
import express from 'express';
import compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import Template from './components/Template';

const app = express();

app.use(compression())

app.use(express.static(path.join(__dirname, 'static')));

/**
* app listen methods; required for executing AFTER 
* webpack script in dev-server.js
*
* @return null
*/
function createApp () {
	app.get('*', function (req, res) {
		const context = {};
		let status = 200;
		let content = '<!doctype html>';

		content += renderToString(
			<Router location={req.url} context={context}>
				<Template />
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

	app.listen(8080, function() {
	    console.log('Live at http://localhost:8080/');
	});
}

if (process.env.NODE_ENV === 'production') {
	createApp();
}

export { app, createApp };