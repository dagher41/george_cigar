import Express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';

import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import AppContainer from '../client/AppContainer';
import configureStore from '../client/store';
import messageRoutes from './modules/messages/messages.routes';

const app = new Express();
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(Express.static(path.resolve(__dirname, '../dist/client')));
app.use('/api', messageRoutes);

const isDevMode = process.env.NODE_ENV === 'development' || false;
if (isDevMode) {
    // the following allows express to serve files located in Webpack's memory
    const webpack = require('webpack');
    const config = require('../webpack.config.dev');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath,
        watchOptions: {
            poll: 1000
        }
    }));
}

app.get('/*', (req, res) => {
    const context = {};
    const app = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <AppContainer store={configureStore({})} />
        </StaticRouter>
    );
    const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
    res.send(
        `<html>
            <head>
                <link href="https://fonts.googleapis.com/css?family=Raleway:200" rel="stylesheet">
                <link href="${isDevMode ? '/bundle.css' : assetsManifest['/bundle.css']}" rel="stylesheet"></link>
            </head>
            <body class="container-fluid m-0 p-0">
                <div id="root">${app}</div>
                ${isDevMode ? '<script src="/vendor.js"></script>' : ''}
            <script src="${isDevMode ? '/bundle.js' : assetsManifest['/bundle.js']}"></script>
            </body >
        </html > `
    );
});

app.listen((process.env.PORT || 3000), (error) => {
    if (!error) {
        console.log(`MERN is running on port: ${(process.env.PORT || 3000)}! Build something amazing!`); // eslint-disable-line
    } else {
        console.log('error: ', error);
    }
});