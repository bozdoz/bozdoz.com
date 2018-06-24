import * as path from "path";
import * as webpack from "webpack";
import {
  default as ExtractTextPlugin,
  loader as ExtractTextPluginLoader
} from "mini-css-extract-plugin";

const { NODE_ENV } = process.env;

const client = {
  entry: ["./src/client.tsx"],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "js/main.js",
    publicPath: "/"
  },
  mode: NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
            cacheDirectory: ".babel_cache",
            ignore: path.resolve(__dirname, "node_modules")
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
};

console.log("NODE_ENV", NODE_ENV);

if (NODE_ENV === "production") {
  // extract css into a file
  client.plugins.push(new ExtractTextPlugin({
    filename: "./css/[name].css"
  }));
  client.module.rules.push({
    test: /\.s?css$/,
    use: [
      ExtractTextPluginLoader,
      'css-loader',
      'sass-loader',
      'postcss-loader',
    ]
  });
} else {
  client.entry = ["webpack-hot-middleware/client", ...client.entry];

  // live editing
  client.plugins.push(new webpack.HotModuleReplacementPlugin());
  // scss handling
  client.module.rules.push({
    test: /\.s?css$/,
    use: [
      "style-loader",
      "css-loader?sourceMap",
      "sass-loader?sourceMap",
      "postcss-loader?sourceMap"
    ]
  });
  // devtool sources
  client.devtool = "cheap-module-eval-source-map";

  client.devServer = {
    historyApiFallback: true,
    hot: true
  };
}

const server = {
  target: "node",
  node: {
    __dirname: false
  },
  mode: NODE_ENV,
  entry: "./src/server.tsx",
  output: {
    path: path.join(__dirname, "src"),
    filename: "server.min.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader"
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  },
  module: client.module
};

export default [server, client];

export { server, client };
