import RouteBuilder from '../route-builder';
import PageSectionController from './product-group.controller';

const router = RouteBuilder(PageSectionController, (router) => {
    router
        .route('/pages/:slug/product_group/new')
        .get(router.newPage);

    router
        .route('/pages/:slug/product_groups')
        .post(router.createAction);

    router
        .route('/product_groups/:id/edit')
        .get(router.editPage);

    router
        .route('/product_groups/:id/update')
        .put(router.updateAction);
})

export default router;