'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const autoprefixer = require('autoprefixer');
// const CleanPlugin = require('./utils/clean-plugin');
// cons3000);

const isProduction = process.env['NODE_ENV'] === 'production';

const config = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    // new ExtractTextPlugin('css/bundle.css'),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  module: {
    exprContextCritical: false, // Suppress "The request of a dependency is an expression"
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: 'babel-loader',
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=10000&name=[name]-[hash].[ext]',
        include: path.join(__dirname, 'src'),
      },
      // {
      //   test: /\.json$/,
      //   loader: 'json-loader',
      //   include: path.join(__dirname, 'src'),
      // },
    ],
  },
};

if (isProduction) {
  config.entry = './src/Bootstrap';
  config.plugins.push(new UglifyJSPlugin());
} else {
  config.devtool = 'eval';
  config.entry = [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/Bootstrap',
  ];
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
