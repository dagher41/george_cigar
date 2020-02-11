import RouteBuilder from '../route-builder';
import ProductController from './product.controller';

const router = RouteBuilder(ProductController, (router) => {
    router
        .route('/product_groups/:productGroupId/products/new')
        .get(router.newPage);

    router
        .route('/product_groups/:productGroupId/products')
        .post(router.createAction);

    router
        .route('/product_groups/:productGroupId/products/:id/edit')
        .get(router.editPage);

    router
        .route('/product_groups/:productGroupId/products/:id/update')
        .put(router.updateAction);
})

export default router;