var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');

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
                    {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins: () => [
                                postcssFocus(),
                                cssnext({
                                    browsers: ['last 2 versions', 'IE > 10'],
                                }),
                                postcssReporter({
                                    clearMessages: true,
                                }),
                            ],
                        },
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.jsx*$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(pdf|jpe?g|png|gif|svg|ico)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    },
                ]
            }
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
