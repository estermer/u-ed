const webpack = require('webpack');
const path = require('path');

const SRC_BASE = path.resolve(__dirname, 'src');

// copy manifest.json to the path: 'public/build'
// this will allow for the authRequest to see the file at www.example.com/manifest.json
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssOutput = new ExtractTextPlugin({ filename: 'style.css', allChunks: true });

const ManifestAssetPlugin = new CopyWebpackPlugin([
  { from: 'src/assets/manifest.json', to: 'manifest.json' },
]);
const IconAssetPlugin = new CopyWebpackPlugin([
  { from: 'src/images/icon-192x192.png', to: 'icon-192x192.png' },
]);

const CommonsPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  filename: 'vendor.js',
  children: true,
});

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

const config = {
  entry: {
    main: path.resolve(SRC_BASE, 'index'),
    vendor: ['babel-polyfill', 'react', 'redux'],
  },
  target: 'web',
  output: {
    path: path.resolve('public/build'),
    filename: 'index_bundle.js',
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.js', '.jsx', '.json', '.css'],
  },
  devServer: {
    port: 1988,
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  module: {
    rules: [
      { enforce: 'pre', test: /\.js$/, use: 'eslint-loader', exclude: /node_modules/ },
      { enforce: 'pre', test: /\.jsx$/, use: 'eslint-loader', exclude: /node_modules/ },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        use: 'file-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    CommonsPlugin,
    ManifestAssetPlugin,
    IconAssetPlugin,
    cssOutput,
  ],
};

module.exports = config;
