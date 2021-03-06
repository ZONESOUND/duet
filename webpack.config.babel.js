// webpack.config.dev.js
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  externals: {
		// require("jquery") is external and available
		//  on the global var jQuery
		"p5": "p5"
	},
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  module: {
    rules: [{
      test: /\.js/,
      exclude: /(node_modules|bower_components)/,
      use: [{
          loader: 'babel-loader'
      }]
    },
    {
      test: /\.css/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(png|jpe?g|gif|mid)$/i,
      loader: 'file-loader',
      options: {
        // 配置 name 屬性 (第二步)
        name: '[name].[ext]',
      }
    }
  ]}
}