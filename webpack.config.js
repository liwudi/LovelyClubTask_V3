var webpack = require('webpack');
//import webpack from "webpack";

var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var devFlagPlugin = new webpack.DefinePlugin({
	__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry:
		'./src/index.js'
	,
	output: {
		path: 'public',
		filename: 'bundle.js'
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE.ENV': "development"
		}),
		new webpack.HotModuleReplacementPlugin(),

		new OpenBrowserPlugin({
			url: 'http://localhost:8080'
		}),
		new CleanWebpackPlugin('public')
	],

	module: {
		loaders: [{
			test: /\.js[x]?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015',"react","stage-1"]
			}
		}, {
			test: /\.css$/,
			loaders: ['style', 'css'],
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader'
		}, {
			test: /\.less$/,
			loader: "style-loader!css-loader!less-loader",
		}]
	}
};
