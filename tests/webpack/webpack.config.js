const path = require("path");
const webpack = require("webpack");

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "inline-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  resolve: {
    fallback: {
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer"),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser.js",
    }),
    new webpack.NormalModuleReplacementPlugin(/node:crypto/, (resource) => {
      resource.request = resource.request.replace(/^node:/, "");
    }),
  ],
};
