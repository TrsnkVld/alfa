const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
	mode: 'production',
	entry: './src/js/index.js',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /.(s*)css$/,
				use: [
					miniCss.loader,
					'css-loader?url=false',
					'sass-loader',
				]
			}
		]
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
	target: ['web', 'es5', 'es6'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'assets/js/bundle.js'
	},
	watchOptions: {
		poll: true,
		ignored: /node_modules/
	},
	//devtool: 'inline-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			publicPath: './'
		}),
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
		new miniCss({
			filename: 'assets/css/main.css',
		}),
		new CopyPlugin({
			patterns: [
				{ from: './public', to: './' },
			],
		}),
	]
};