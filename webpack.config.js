const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');

dotenv.config();

module.exports = {
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: { extensions: ['.ts'] },
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : false,
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
