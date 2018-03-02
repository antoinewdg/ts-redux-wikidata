const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const path = require('./path');

module.exports = {
  entry: {
    app: path.indexJs,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'cache-loader' },
          { loader: 'thread-loader', options: { workers: require('os').cpus().length - 1 } },
          { loader: 'ts-loader', options: { happyPackMode: true } },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.src, 'node_modules'],
  },
  plugins: [
    new CleanWebpackPlugin([path.dist]),
    new HtmlWebpackPlugin({
      title: 'Two page webapp',
      template: path.indexHTML,
    }),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      tsconfig: path.tsconfig,
      tslint: path.tslint,
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.dist,
  },
};
