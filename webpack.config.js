// const { VueLoaderPlugin } = require('vue-loader');
// const path = require('path');
// const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('vue-html-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
// const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

// const isDev = process.env.NODE_ENV === 'development';

// module.exports = {
//     entry: {
//         polyfill: '@babel/polyfill',
//         main: './src/app/index.js',
//     },
//     output: {
//         path: path.resolve(__dirname, './src/public'),
//         filename: 'bundle.js'
//     },
//     resolve: {
//         extensions: ['.js', '.vue'],
//         alias: {
//             'vue$': isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
//             '@': path.resolve(__dirname, './src/app')
//         }
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: [/node_modules/, /server/, /conf/],
//                 include: path.resolve(__dirname, './src/app'),
//                 use: {
//                     loader: 'babel-loader'
//                 }
//             },
//             {
//                 test: /\.vue$/,
//                 include: path.resolve(__dirname, './src/app'),
//                 loader: 'vue-loader',
//             },
//             // {
//             //     test: /(\.css|\.scss)$/,
//             //     include: path.resolve(__dirname, './src/app'),
//             //     use: ExtractTextPlugin.extract({
//             //         use: [
//             //             {
//             //                 loader: 'css-loader',
//             //                 options: {
//             //                     sourceMap: true,
//             //                     importLoaders: 1
//             //                 }
//             //             },
//             //             {
//             //                 loader: 'sass-loader',
//             //                 options: {
//             //                     sourceMap: true,
//             //                     importLoaders: 1
//             //                 }
//             //             }
//             //         ],
//             //         fallback: 'vue-style-loader'
//             //     })
//             // },
//             {
//                 test: /\.css$/,
//                 use: [
//                     isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
//                     { loader: 'css-loader', options: { sourceMap: isDev } },
//                 ]
//             },
//             {
//                 test: /\.scss$/,
//                 use: [
//                     isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
//                     { loader: 'css-loader', options: { sourceMap: isDev } },
//                     { loader: 'sass-loader', options: { sourceMap: isDev } }
//                 ]
//             },
//             {
//                 test: /\.sass$/,
//                 use: [
//                     isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
//                     { loader: 'css-loader', options: { sourceMap: isDev } },
//                     { loader: 'sass-loader', options: { sourceMap: isDev } }
//                 ]
//             },
//             {
//                 test: /\.(png|jpg|gif|svg)$/,
//                 loader: "file-loader",
//                 include: [
//                     path.resolve(__dirname, './src/app/assets/images'),
//                 ],
//                 options: {
//                     name: "images/[name].[ext]?[hash]"
//                 }
//             },
//             {
//                 test: /\.(hxd|svg|ttf|woff)$/,
//                 loader: "file-loader",
//                 include: [
//                     path.resolve(__dirname, './src/app/assets/fonts'),
//                 ],
//                 options: {
//                     name: "fonts/[name].[ext]?[hash]"
//                 }
//             }
//         ]
//     },
//     // resolve: {
//     //     alias: {
//     //         vue$: "vue/dist/vue.esm.js"
//     //     },
//     //     extensions: ["*", ".js", ".vue", ".json"]
//     // },
//     // devServer: {
//     //     historyApiFallback: true,
//     //     hot: true,
//     //     contentBase: path.resolve(__dirname, './src/public/js'),
//     //     port: 3000
//     // },
//     // performance: {
//     //     hints: false
//     // },
//     // devtool: "#eval-source-map",
//     plugins: [
//         new VueLoaderPlugin(),
//         new CleanWebpackPlugin(),
//         // new HtmlWebpackPlugin({
//         //     vue: true
//         // }),
//         new HtmlPlugin({
//             template: 'index.html',
//             chunksSortMode: 'dependency'
//         }),
//         new webpack.ProvidePlugin({
//             $: 'jquery',
//             jQuery: 'jquery'
//         }),
//         // new webpack.DefinePlugin({
//         //     'process.env': {
//         //         // This has effect on the react lib size
//         //         'NODE_ENV': JSON.stringify('production'),
//         //     }
//         // }),
//         new ExtractTextPlugin("bundle.css"),
//         new webpack.optimize.AggressiveMergingPlugin(),
//         new webpack.optimize.OccurrenceOrderPlugin(),
//         new UglifyJsPlugin({
//             cache: true,
//             parallel: true,
//             uglifyOptions: {
//                 compress: true,
//                 ecma: 6,
//                 mangle: true
//             },
//             sourceMap: true
//         }),
//         new CompressionPlugin({
//             filename: "[path].gz[query]",
//             algorithm: "gzip",
//             test: /\.(js|css|html)$/,
//         }),
//         new webpack.LoaderOptionsPlugin({
//             minimize: true
//         })
//     ]
// };

// if (process.env.NODE_ENV === "production") {

//     module.exports.devtool = "#source-map";

//     module.exports.plugins = (module.exports.plugins || []).concat([
//         new webpack.DefinePlugin({
//             "process.env": {
//                 NODE_ENV: '"production"'
//             }
//         })
//     ]),
//         new webpack.LoaderOptionsPlugin({
//             minimize: true
//         })
// }

'use strict';

const environment = (process.env.NODE_ENV || 'development').trim();

if (environment === 'development') {
  module.exports = require('./webpack.config.dev');
} else {
  module.exports = require('./webpack.config.prod');
}
