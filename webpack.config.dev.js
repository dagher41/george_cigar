const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');

module.exports = {
    entry: {
        bundle: ['./client/index.js', './client/assets/stylesheets/app.scss'],
    },
    mode: 'development',
    output: {
        path: __dirname,
        publicPath: 'http://0.0.0.0:3000/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }, {
                test: /\.(pdf|jpe?g|png|gif|svg|ico)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    },
                ]
            }, {
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
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "bundle.css",
            // chunkFilename: "[id].css"
        })
    ],
    optimization: { // <- creates a separate vendor.js for external dependencies
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                // vendor chunk
                vendor: {
                    // sync + async chunks
                    chunks: 'all',
                    name: 'vendor',
                    // import file path containing node_modules
                    test: /node_modules/
                }
            }
        }
    }
};