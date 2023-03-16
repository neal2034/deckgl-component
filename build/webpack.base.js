const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const entry = {
  index: ['/src/index.tsx'],
};

const htmlWebpackPlugin = Object.keys(entry).map(
  name =>
    new HtmlWebpackPlugin({
      inject: 'body',
      scriptLoading: 'defer',
      template: path.join(__dirname, '../template/index.html'),
      minify: false,
      filename: `${name}.html`,
      chunks: [name],
    }),
);

module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /\.tsx?|.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader', // babel-loader处理jsx或tsx文件
          options: {
            cacheDirectory: true,
          },
        },{
          loader: 'ts-loader'
        }]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5000,
            name: 'assets/[name].[hash:8].[ext]',
          },
        },
      },
      // 处理SVG
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5000,
            mimetype: 'image/svg+xml',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.ts',
      '.tsx',
      '.node',
      '.png',
      '.css',
    ],
  },
  plugins: [new MiniCssExtractPlugin(), ...htmlWebpackPlugin],
};
