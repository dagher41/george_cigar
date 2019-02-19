const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        bundle: ['./client/index.js', './client/assets/stylesheets/app.scss'],
        vender: ['react', 'react-dom']
    },
    mode: 'development',
    output: {
        path: __dirname,
        // filename: 'bundle.js',
        // chunkFilename: '[name].js',
        publicPath: 'http://0.0.0.0:3000/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }, {
                test: /\.(pdf|jpe?g|png|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'url-loader'
                    },
                ]
            }, {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, // <-  pulls the css into it's own file (see plugin below)
                    },
                    "css-loader", // translates CSS into CommonJS
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