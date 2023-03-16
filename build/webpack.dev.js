// 基于Web环境下的webpack配置\
/* eslint @typescript-eslint/no-var-requires: "off" */
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base');
const ESLintPlugin = require('eslint-webpack-plugin');

const webpackDevConfig = {
  output: {
    publicPath: '/',
    filename: '[name].dev.js',
  },
  mode: 'development',
  module: {},
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'ts', 'tsx'],
    }),
  ],
  devServer: {
    open: true,
    client: {
      overlay: false,
    },
    historyApiFallback: true,
  },
};

module.exports = merge(webpackBaseConfig, webpackDevConfig);
