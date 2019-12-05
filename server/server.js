import Express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';
import EnsureLoggedIn from 'connect-ensure-login';
import methodOverride from 'method-override';

import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import AppContainer from '../client/AppContainer';
import configureStore from '../client/store';

import Helmet from 'react-helmet';


const app = new Express();
app.set('view engine', 'pug');
app.set('views','./server/views');

app.use(compression()); 
app.use(flash());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use(Express.static(path.resolve(__dirname, '../dist/client')));
app.use(Express.static(path.resolve(__dirname, '../public')));

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

import messageRoutes from './modules/messages/messages.routes';
import registrationRoutes from './modules/registration/registration.routes';
import sessionRoutes from './modules/session/session.routes';
import productRoutes from './modules/products/products.routes';
import reviewRoutes from './modules/review/review.routes'

app.use('/api', bodyParser.json({ limit: '20mb' }));
app.use('/api', [messageRoutes, productRoutes.api, reviewRoutes.api]);
app.use('/admin', bodyParser.urlencoded({ extended: true }));
app.use('/admin', [sessionRoutes, registrationRoutes]);
app.use('/admin', EnsureLoggedIn.ensureLoggedIn('/admin/login'))
app.use('/admin', [productRoutes.admin, reviewRoutes.admin]);

app.get('/*', (req, res) => {
    const context = {};
    const app = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <AppContainer store={configureStore({})} />
        </StaticRouter>
    );
    const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
    const head = Helmet.rewind();
    res.send(
        `<html>
            <head>
                ${head.base.toString()}
                ${head.title.toString()}
                ${head.meta.toString()}
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
        console.log(`PERN is running on port: ${(process.env.PORT || 3000)}! Build something amazing!`); // eslint-disable-line
    } else {
        console.log('error: ', error);
    }
});