var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: ['./src/index.js'], 
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2',
  },
  module: {
      rules: [{
          test: /\.js/,
          exclude: /(node_modules|bower_components)/,
          use: [{
              loader: 'babel-loader'
          }]
      }]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  optimization: {
    minimize: true
  }
}