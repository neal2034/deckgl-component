/* eslint-disable @typescript-eslint/no-var-requires */
// production webpack configuration
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /(react|react-dom)/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
});
