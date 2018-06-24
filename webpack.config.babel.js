import * as path from "path";
import * as webpack from "webpack";
import * as nodeExternals from "webpack-node-externals";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";

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
        test: /\.(js)$/,
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
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
};

console.log("NODE_ENV", NODE_ENV);

if (NODE_ENV === "production") {
  // extract css into a file
  client.plugins.push(new ExtractTextPlugin("./css/[name].css"));
  client.module.rules.push({
    test: /\.s?css$/,
    use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: ["css-loader", "sass-loader", "postcss-loader"],
      publicPath: "/css/"
    })
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
  externals: [
    nodeExternals({
      modulesFromFile: true
    })
  ],
  entry: "./src/server.tsx",
  output: {
    path: path.join(__dirname, "src"),
    filename: "server.min.js"
  },
  module: client.module
};

export default [server, client];

export { server, client };
