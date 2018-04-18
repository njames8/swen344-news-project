const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist/"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader')
            },
            {
                test: /\.(otf|eot|svg|ttf|woff)/,
                loader: 'url-loader?limit=8192'
            },
            { test: /\.(php)$/,
                loader: "file?name=[path][name].[ext]&context=./app/static"
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            Popper: ['popper.js', 'default'],
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new HtmlPlugin({
            template: __dirname + '/public/index.html',
            filename: 'index.html',
        }),
        new ExtractTextPlugin('bundle.css')
    ]
};