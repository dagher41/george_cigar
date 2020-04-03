import Express from 'express';
import compression from 'compression';
import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';
import morgan from 'morgan';
import EnsureLoggedIn from 'connect-ensure-login';
import methodOverride from 'method-override';

import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Root from '../client/Root';
import configureStore from '../client/store';
import catalogLocator from './modules/lib/middleware/catalog-locator';
import catalogOwnership from './modules/lib/middleware/catalog-ownership';
import { CatalogPage } from './models';

import Helmet from 'react-helmet';

const app = new Express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(compression());
app.use(flash());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use(Express.static(path.resolve(__dirname, '../dist/client')));
app.use(Express.static(path.resolve(__dirname, '../public')));

const isDevMode = process.env.NODE_ENV === 'development';
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

import publicApi from './modules/public-api';
import merchantApp from './modules/merchant';
import userRoutes from './modules/user/user.routes';

app.use('/*', catalogLocator);
app.use([publicApi, merchantApp]);
app.use(['/admin'], EnsureLoggedIn.ensureLoggedIn('/merchant/login'));
app.use(['/admin'], catalogOwnership)

app.use('/admin', [userRoutes.admin]);

app.get('/*', async (req, res) => {
    const context = {};
    const pages = await CatalogPage.findAll({
        where: { catalogId: req.catalog.id, publicVisible: true },
        attributes: ['id', 'name', 'slug', 'position', 'templateId', 'clientMetadata'],
        order: [['position', 'ASC']]
    });
    const { id, name, address, social, contact, businessHours, logoSrc, faviconPrefix } = req.catalog;
    const store = {
        catalogData: {
            id,
            logoSrc,
            faviconPrefix,
            catalogName: name,
            address: JSON.parse(address),
            social: JSON.parse(social),
            contact: JSON.parse(contact),
            businessHours: JSON.parse(businessHours),
            pages: pages.map(page => {
                page.clientMetadata = JSON.parse(page.clientMetadata);
                return page;
            })
        }
    };
    const app = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <Root store={configureStore(store)} />
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
                <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(store).replace(/</g, '\\u003c')}
                </script>
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

app.use(function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    console.log(err);
    res.status(500)
    res.json(JSON.parse(JSON.stringify(err, ['message'])))
})