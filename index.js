require('dotenv').config();
require("@babel/polyfill");
require('babel-plugin-require-context-hook/register')();

if (process.env.NODE_ENV === 'production') {
    process.env.webpackAssets = JSON.stringify(require('./dist/client/manifest.json'));
    require('./dist/server.bundle.js');
} else {
    require("@babel/register")({
        "plugins": [
            [
                "file-loader",
                {
                    "name": "[hash].[ext]",
                    "publicPath": "/",
                    "outputPath": "../dist/client",
                }
            ]
        ]
    });

    require('./server/server');
}