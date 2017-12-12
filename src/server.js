import path from 'path';
import express from 'express';
import helmet from 'helmet';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import Template from './components/Template';

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

	app.listen(PORT, function() {
	    console.log(`Live at http://localhost:${PORT}/`);
	});
}

if (process.env.NODE_ENV === 'production') {
	createApp();
}

export { app, createApp };