import { Router } from 'express';
import _pick from 'lodash/pick'

import { CatalogPage, ProductGroup, MerchantPage } from '../../models';

const DEFAULT_ROUTES = {
  index: { route: '', method: 'get', action: 'indexPage' },
  new: { route: '/new', method: 'get', action: 'newPage' },
  create: { route: '', method: 'post', action: 'createAction' },
  show: { route: '/:id', method: 'get', action: 'showPage' },
  edit: { route: '/:id/edit', method: 'get', action: 'editPage' },
  update: { route: '/:id/update', method: 'put', action: 'updateAction' }
}

export default class AdminViewController {

  constructor() {
    this.indexPage = this.indexPage.bind(this);
    this.newPage = this.newPage.bind(this);
    this.createAction = this.createAction.bind(this);
    this.showPage = this.showPage.bind(this);
    this.editPage = this.editPage.bind(this);
    this.updateAction = this.updateAction.bind(this);
  }

  static buildResource(resourceName, routes, options) {
    const router = new Router();
    const controller = new this();
    const routerValues = _pick(DEFAULT_ROUTES, routes);

    for (let [_, value] of Object.entries(routerValues)) {
      const identifier = options && options.resourceIdentifier;

      // this is needed for routes that define a /blah/:slug instead of /blah/:id
      const routePath = identifier ? value.route.replace(':id', `:${identifier}`) : value.route

      // this results in something like router.get('/some/path', controller.someAction);
      router[value.method](`/${resourceName}${routePath}`, controller[value.action]);
    }

    return { router, controller };
  }

  async indexPage({ res, pageParams, currentPage, templateName }) {
    this._renderPage({ res, pageParams, currentPage, templateName: templateName || 'index' })
  }

  async newPage({ res, pageParams, currentPage, templateName }) {
    this._renderPage({ res, pageParams, currentPage, templateName: templateName || 'new' });
  }

  async createAction({ res, redirectPath, currentPage }) {
    res.redirect(redirectPath || currentPage.getMerchantPath());
  }

  async showPage({ res, pageParams, currentPage, templateName }) {
    this._renderPage({ res, pageParams, currentPage, templateName: templateName || 'show' });
  }

  async editPage({ res, pageParams, currentPage, templateName }) {
    this._renderPage({ res, pageParams, currentPage, templateName: templateName || 'edit' });
  }

  async updateAction({ res, redirectPath, currentPage }) {
    res.redirect(redirectPath || currentPage.getMerchantPath());
  }

  async _renderPage({ res, templateName, pageParams, currentPage }) {
    const resourceName = this.getResourceName()
    const template = `pages/${resourceName}/${templateName}`;
    const navItems = await MerchantPage.findAll({
      attributes: ['id', 'name', 'classification', 'slug', 'position'],
      include: {
        model: CatalogPage,
        as: 'catalogPage',
        where: { catalogId: res.locals.catalog.id }
      },
      order: [['position', 'ASC']]
    });

    const currentNav = navItems.find((item) => item.slug == currentPage.slug)
    res.render(template, Object.assign(pageParams, { navItems, currentNav }));
  }

  async _getProductGroup(id, catalogId) {
    return await ProductGroup.findByPk(id, {
      include: {
        model: CatalogPage,
        as: 'page',
        include: {
          model: MerchantPage,
          as: 'merchantPage'
        },
        where: { catalogId }
      }
    });
  }

  async _getMerchantPage(catalogId, slug) {
    return await MerchantPage.findOne({
      where: { slug },
      include: {
        model: CatalogPage,
        as: 'catalogPage',
        where: { catalogId }
      }
    })
  }
}
