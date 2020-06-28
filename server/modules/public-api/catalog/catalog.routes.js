import { Router } from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import Root from '../../../../client/Root';
import configureStore from '../../../../client/store';
import { CatalogPage } from '../../../models';

const router = new Router();
router
  .route('/*')
  .get(async (req, res) => {
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
    const isDevMode = process.env.NODE_ENV === 'development';
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

export default router;