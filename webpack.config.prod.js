var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'hidden-source-map',
    entry: {
        bundle: [
            './client/index.js',
            './client/assets/stylesheets/app.scss'
        ],
    },
    output: {
        path: __dirname + '/dist/client/',
        filename: '[name].[chunkhash].js',
        publicPath: '/',
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            'client',
            'node_modules',
        ],
    },

    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, // <-  pulls the css into it's own file (see plugin below)
                    },
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader"
                ]
            },
            {
                test: /\.jsx*$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
        new MiniCssExtractPlugin({
            filename: "bundle.[contenthash].css",
        }),
        new ManifestPlugin({
            basePath: '/',
        })
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    }
};
