import open from 'open';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

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
  // tslint:disable-next-line:no-console
  console.log(`live at: http://localhost:${PORT}`);
  open(`http://localhost:${PORT}`);
});
