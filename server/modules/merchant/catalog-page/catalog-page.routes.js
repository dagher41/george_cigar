import RouteBuilder from '../route-builder';
import CatalogPageController from './catalog-page.controller';

const router = RouteBuilder(CatalogPageController, (router) => {
    router
        .route('/pages/:slug')
        .get(router.showPage);
});

export default router;