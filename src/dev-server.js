import { app, createApp } from './server';
import { client } from '../webpack.config.babel';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import expressGraphQL from 'express-graphql';
import schema from './graphql/schema';

const bundler = webpack(client);

app.use('/graphql', expressGraphQL({
	schema,
	graphiql: true
}));

app.use(webpackDevMiddleware(bundler, {
	publicPath: client.output.publicPath,
	watchOptions: {
		poll: true
	},
	stats: {
		colors: true,
		errorDetails: true
	}
}));

app.use(webpackHotMiddleware(bundler));

createApp();