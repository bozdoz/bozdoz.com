import * as path from 'path';
import * as express from 'express';
import * as React from 'react';
import * as fs from 'fs';
import * as fm from 'front-matter';
import {
  renderToString as render,
  renderToStaticMarkup
} from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';

import ServerTemplate from './components/ServerTemplate';
import Sitemap from './components/Sitemap';

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

const getMarkdown = (page: string) => {
  const filename = path.join(__dirname, 'pages', `${page}.md`);
  const content = fs.readFileSync(filename, 'utf8');

  return fm(content);
};

/**
 * app listen methods; required for executing AFTER
 * webpack script in dev-server.js
 */
function createApp(cb = () => {}) {
  app.get('/pages/*', function(req, res) {
    const page = req.params['0'];
    let status = 200;
    let content;

    try {
      if (req.xhr) {
        content = getMarkdown(page);
      }
    } catch (e) {
      // can't find a file; return 404
      content = getMarkdown('404');
      status = 404;
    }

    res.status(status).send(content);
  });

  app.get('/sitemap.xml', function(req, res) {
    let content = '<?xml version="1.0" encoding="UTF-8"?>';
    content += renderToStaticMarkup(<Sitemap />);
    res
      .header('Content-Type', 'text/xml')
      .status(200)
      .send(content);
  });

  app.get('*', function(req, res) {
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

export { app, createApp, getMarkdown };
