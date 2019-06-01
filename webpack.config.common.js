'use strict';

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlPlugin = require('html-webpack-plugin');
const HtmlWebpackPlugin = require('vue-html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const webpack = require('webpack');
const UglifyJsPlugin = require('terser-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const webpackConfig = {
  entry: {
    polyfill: '@babel/polyfill',
    main: './src/app/index.js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
      '@': path.resolve(__dirname, './src/app')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [path.resolve(__dirname, './src/app')],
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /server/, /conf/],
        include: path.resolve(__dirname, './src/app'),
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } }
        ]
      },
      {
        test: /\.sass$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        include: [
          path.resolve(__dirname, './src/app/assets/images'),
        ],
        options: {
          name: "images/[name].[ext]?[hash]"
        }
      },
      {
        test: /\.(hxd|svg|ttf|woff)$/,
        loader: "file-loader",
        include: [
          path.resolve(__dirname, './src/app/assets/fonts'),
        ],
        options: {
          name: "fonts/[name].[ext]?[hash]"
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
        vue: true
    }),
    new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
    }),
    // new VuetifyLoaderPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     // This has effect on the react lib size
    //     'NODE_ENV': JSON.stringify('production'),
    //   }
    // }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJsPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
            compress: true,
            mangle: true
        },
        sourceMap: true
    }),
    new HtmlWebpackTagsPlugin({
        tags: [],
        links: [
            {
                path: '/images/logo.ico',
                attributes: {
                    rel: 'icon'
                }
            },
        ]
    }),
    new CopyPlugin([
        { 
            from: './src/app/assets/images/*.ico', 
            to: 'images/',
            flatten: true,
        },
    ]),
  ]
};

module.exports = webpackConfig;
