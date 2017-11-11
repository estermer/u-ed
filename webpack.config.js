const path = require('path');

// copy manifest.json to the path: 'public/build'
// this will allow for the authRequest to see the file at www.example.com/manifest.json
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ManifestAssetPlugin = new CopyWebpackPlugin([
  { from: 'src/assets/manifest.json', to: 'manifest.json' },
]);
const IconAssetPlugin = new CopyWebpackPlugin([
  { from: 'src/images/icon-192x192.png', to: 'icon-192x192.png' },
]);

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

const config = {
  entry: './src/index.jsx',
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
        use: 'file-loader!url-loader',
      },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
    ],
  },
  plugins: [HtmlWebpackPluginConfig, ManifestAssetPlugin, IconAssetPlugin],
};

module.exports = config;
