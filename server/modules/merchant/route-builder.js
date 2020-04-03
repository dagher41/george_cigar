import { Router } from 'express';
import { CatalogPage, MerchantPage } from '../../models';

class MerchantRouteHandler {
    constructor(Controller) {
        this.controller = new Controller();
    }

    async indexPage(req, res) {
        const { currentPage, pageParams } = await this.controller.indexPage(req);
        this.renderPage(res, req.catalog, 'index', pageParams, currentPage)
    }

    async showPage(req, res) {
        const { currentPage, pageParams } = await this.controller.showPage(req);
        this.renderPage(res, req.catalog, 'show', pageParams, currentPage);
    }

    async newPage(req, res) {
        const { currentPage, pageParams } = await this.controller.newPage(req);
        this.renderPage(res, req.catalog, 'new', pageParams, currentPage);
    }

    async createAction(req, res) {
        const { currentPage } = await this.controller.createAction(req);
        res.redirect(`/merchant/${currentPage.getMerchantPath()}`);
    }

    async editPage(req, res) {
        const { currentPage, pageParams } = await this.controller.editPage(req);
        this.renderPage(res, req.catalog, 'edit', pageParams, currentPage);
    }

    async updateAction(req, res) {
        const { currentPage } = await this.controller.updateAction(req);
        res.redirect(`/merchant/${currentPage.getMerchantPath()}`);
    }

    async renderPage(res, catalog, templateName, templateParams, currentPage) {
        const resourceName = this.controller.getResourceName()
        const template = `pages/${resourceName}/${templateName}`;
        const navItems = await MerchantPage.findAll({
            include: {
                model: CatalogPage,
                as: 'catalogPage',
                where: { catalogId: catalog.id }
            },
            order: [['position', 'ASC']]
        });

        const currentNav = navItems.find((item) => item.slug == currentPage.slug)
        res.render(template, Object.assign(templateParams, { navItems, currentNav, catalog }));
    }
}

export default (controller, callback) => {
    const routeHandler = new MerchantRouteHandler(controller);
    const router = new Router();
    router.indexPage = routeHandler.indexPage.bind(routeHandler);
    router.showPage = routeHandler.showPage.bind(routeHandler);
    router.newPage = routeHandler.newPage.bind(routeHandler);
    router.createAction = routeHandler.createAction.bind(routeHandler);
    router.editPage = routeHandler.editPage.bind(routeHandler);
    router.updateAction = routeHandler.updateAction.bind(routeHandler);

    callback(router);

    return router;
}