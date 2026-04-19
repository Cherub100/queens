
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/images', to: 'images' },
        { from: 'public/_redirects', to: '_redirects' },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_PAYPAL_CLIENT_ID': JSON.stringify(process.env.REACT_APP_PAYPAL_CLIENT_ID),
    }),
  ],
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
  },
};
