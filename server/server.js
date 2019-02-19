import Express from 'express';
import compression from 'compression';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import AppContainer from '../client/AppContainer';

const app = new Express();
app.use(compression());

const isDevMode = process.env.NODE_ENV === 'development' || false;
if (isDevMode) {
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
            <AppContainer />
        </StaticRouter>
    );

    res.send(
        `<html>
            <head>
                <link rel="stylesheet" href="./bundle.css"></link>
            </head>
            <body>
                <div id="root">${app}</div> Yo Yo
                <script src="/vendor.js"></script>
                <script src="/bundle.js"></script>
            </body>
        </html>`
    );
})

app.listen(3000, (error) => {
    if (!error) {
        console.log(`MERN is running on port: ${3000}! Build something amazing!`); // eslint-disable-line
    } else {
        console.log('error: ', error);
    }
});