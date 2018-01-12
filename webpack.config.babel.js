import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const { NODE_ENV } = process.env;

const client = {
	entry : [
		'./src/client.js'
	],
	output: {
		path: path.resolve(__dirname, 'src', 'static'),
		filename: 'js/main.js',
		publicPath: '/'
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
			}
		]
	}, 
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(NODE_ENV)
			}
		}),
	]
};

console.log('NODE_ENV', NODE_ENV);

if (NODE_ENV === 'production') {
	// uglify js
	client.plugins.push(
		new webpack.optimize.UglifyJsPlugin()
	);
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
					'css-loader?sourceMap', 
					'sass-loader?sourceMap', 
					'postcss-loader?sourceMap'
				],
				publicPath: '/css/'
			})
		}
	);
} else {
	client.entry = [
		'webpack-hot-middleware/client',
		...client.entry
	];

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
				'css-loader?sourceMap', 
				'sass-loader?sourceMap', 
				'postcss-loader?sourceMap'
			]
		}
	);
	// devtool sources 
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