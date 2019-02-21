var path = require('path');
var ExternalsPlugin = require('webpack2-externals-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'server/server.js'),
    output: {
        path: __dirname + '/dist/',
        filename: 'server.bundle.js',
        libraryTarget: 'commonjs2',
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            'client',
            'node_modules',
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
                use: [
                    {
                        loader: 'file-loader'
                    },
                ],
            },
        ],
    },
    plugins: [
        new ExternalsPlugin({
            type: 'commonjs',
            include: path.join(__dirname, 'node_modules'),
        }),
    ],
};
