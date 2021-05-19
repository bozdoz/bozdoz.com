import path from 'path';
import express from 'express';
import React from 'react';
import {
  renderToString as render,
  renderToStaticMarkup
} from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';

import getMarkdown from './util/getMarkdown';
import ServerTemplate from './components/ServerTemplate';
import Sitemap from './components/Sitemap';

const app = express();

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, '../public')));

// it removes trailing slash
app.use((req, res, next) => {
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
 */
function createApp(cb = () => {}) {
  app.get('/pages/*', async (req, res) => {
    const page = req.params['0'];
    let status = 200;
    let content: UnwrapPromise<ReturnType<typeof getMarkdown>>;

    try {
      if (req.xhr) {
        content = await getMarkdown(page);
      }
    } catch (e) {
      // can't find a file; return 404
      content = await getMarkdown('404');
      status = 404;
    }

    // TODO: content might not be defined
    res.status(status).send(content!);
  });

  app.get('/sitemap.xml', async (req, res) => {
    let content = '<?xml version="1.0" encoding="UTF-8"?>';
    // squirrelly way of rendering an async component
    const sitemap = await Sitemap();
    content += renderToStaticMarkup(sitemap);
    res
      .header('Content-Type', 'text/xml')
      .status(200)
      .send(content);
  });

  app.get('*', (req, res) => {
    const context: {
      url?: string;
      is404?: boolean;
    } = {};
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

  app.listen(process.env.PORT || 8005, cb);
}

if (process.env.NODE_ENV === 'production') {
  createApp();
}

export {
  app,
  // export for dev-server
  createApp
};
