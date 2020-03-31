import * as open from 'open';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';

import { client } from '../webpack.config.babel';

import { app, createApp } from './server';

const bundler = webpack(client as any);

app.use(
  webpackDevMiddleware(bundler, {
    publicPath: client.output.publicPath,
    watchOptions: {
      poll: true
    },
    stats: {
      colors: true,
      errorDetails: true
    }
  })
);

app.use(webpackHotMiddleware(bundler));

createApp(() => {
  const PORT = process.env.PORT || 8005;
  open(`http://localhost:${PORT}`);
});
