import Express from 'express';
import compression from 'compression';
import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';
import morgan from 'morgan';
import methodOverride from 'method-override';
import path from 'path';
import sequelizeStore from 'connect-session-sequelize';

import catalogLocator from './modules/lib/middleware/catalog-locator';
import db from './models';

const SequelizeStore = sequelizeStore(session.Store);

const app = new Express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(compression());
app.use(Express.static(path.resolve(__dirname, '../dist/client')));
app.use(Express.static(path.resolve(__dirname, '../public')));

app.use((req, res, next) => {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
});

app.use(flash());
app.use(session({
    secret: process.env.SECRET_KEY_BASE || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: db,
        table: 'PersistentSession',
        disableTouch: true
    }),
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 24 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

if (process.env.NODE_ENV === 'development') {
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
import adminApp from './modules/admin';

app.use('/*', catalogLocator);
app.use([adminApp, merchantApp, publicApi]);

app.use((err, _, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    console.log(err);
    res.status(500)
    res.json(JSON.parse(JSON.stringify(err, ['message'])))
});

app.listen((process.env.PORT || 3000), (error) => {
    if (!error) {
        console.log(`PERN is running on port: ${(process.env.PORT || 3000)}! Build something amazing!`); // eslint-disable-line
    } else {
        console.log('error: ', error);
    }
});