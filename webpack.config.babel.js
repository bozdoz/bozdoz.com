import * as path from 'path';
import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals';
import * as ExtractTextPlugin from 'mini-css-extract-plugin';

const { NODE_ENV } = process.env;

const mode = NODE_ENV || 'development';
const sourcemap = mode === 'production' ? '' : '?sourceMap';

const client = {
  entry: ['./src/client.tsx'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/main.js',
    publicPath: '/'
  },
  mode: mode,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          mode === 'production'
            ? ExtractTextPlugin.loader
            : `style-loader${sourcemap}`,
          `css-loader${sourcemap}`,
          `postcss-loader${sourcemap}`,
          `sass-loader${sourcemap}`
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new (ExtractTextPlugin.default || ExtractTextPlugin)({
      filename: './css/[name].css'
    })
  ]
};

console.log('NODE_ENV', mode);

if (mode !== 'production') {
  client.entry = ['webpack-hot-middleware/client', ...client.entry];

  // live editing
  client.plugins.push(new webpack.HotModuleReplacementPlugin());

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
  externals: [
    (nodeExternals.default || nodeExternals)({
      modulesFromFile: true
    })
  ],
  mode: mode,
  entry: './src/server.tsx',
  output: {
    path: path.join(__dirname, 'src'),
    filename: 'server.min.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  module: client.module
};

export default [server, client];

export { server, client };
