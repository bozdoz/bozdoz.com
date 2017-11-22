import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const client = {
	entry : [
		'./src/client.js'
	],
	output: {
		path: path.resolve(__dirname, 'src', 'static'),
		filename: 'js/main.js',
		publicPath: '/'
	},
	node: {
		fs: 'empty'
	},
	module: {
		rules: [
			{ 
				test: /\.(js)$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env'],
						cacheDirectory: '.babel_cache',
						ignore: path.resolve(__dirname, 'node_modules')
					}
				}
			},
			{
				test: /\.md$/,
				use: [
					'json-loader',
					'front-matter-loader'
				]
			}
		]
	}, 
	plugins: [
		new webpack.DefinePlugin({
		  'process.env': {
		    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
		  }
		}),
	]
};

console.log('NODE_ENV', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
	// uglify js
	/*client.plugins.push(
		new webpack.optimize.UglifyJsPlugin()
	);*/
	// extract css into a file
	client.plugins.push(
		new ExtractTextPlugin('./css/[name].css')
	);
	client.module.rules.push(
		{ 
			test: /\.s?css$/, 
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader', 
				use: [
					'css-loader', 
					'sass-loader', 
					'postcss-loader'
				],
				publicPath: '/css/'
			})
		}
	);
} else {
	client.entry.unshift('webpack-hot-middleware/client');
	// live editing
	client.plugins.push(
		new webpack.HotModuleReplacementPlugin()
	);
	// scss handling 
	client.module.rules.push(
		{ 
			test: /\.s?css$/, 
			use: [
				'style-loader', 
				'css-loader', 
				'sass-loader', 
				'postcss-loader'
			]
		}
	);
	// trivial devtool sources 
	client.devtool = 'cheap-module-eval-source-map';

	client.devServer = {
		historyApiFallback: true,
		hot: true
	};
}

const server = {
	target: 'node',
	node: {
		__dirname: false
	},
	externals: [nodeExternals({
		modulesFromFile: true
	})],
	entry: './src/server.js',
	output: {
		path: path.join(__dirname, 'src'),
		filename: 'server.min.js'
	},
	module: client.module,
	plugins: [
		new webpack.DefinePlugin({
		  'process.env': {
		    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
		  }
		}),
		new webpack.optimize.UglifyJsPlugin()
	]
};

export default [server, client];

export { server, client };