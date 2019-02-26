const path = require('path');

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
                    "outputPath": path.resolve(__dirname, "dist", "client"),
                }
            ]
        ]
    });
    require("@babel/polyfill");
    require('./server/server');
}