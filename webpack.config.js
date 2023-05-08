const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = {
  mode: "development",

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new webpack.ProgressPlugin()
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  watch: true,
};

module.exports = [{
  ...baseConfig,
  entry: {
    server: './src/server.js',
  },
  target: 'node',
  output: {
    filename: '[name].node.js', // 对应着多入口的属性名[name]，这里 [name]是一个变量
    path: path.resolve(__dirname, 'dist'),
  },
}, {
  ...baseConfig,
  entry: {
    js: './src/index.js',
  },
  target: 'web',
  output: {
    filename: '[name].js', // 对应着多入口的属性名[name]，这里 [name]是一个变量
    path: path.resolve(__dirname, 'dist'),
  },
}]