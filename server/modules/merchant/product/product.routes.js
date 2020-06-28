import ProductController from './product.controller';

const { router, controller } = ProductController.buildResource('', []);

router
    .get('/product_groups/:productGroupId/products/new', controller.newPage)
    .post('/product_groups/:productGroupId/products', controller.createAction)
    .get('/product_groups/:productGroupId/products/:id/edit', controller.editPage)
    .put('/product_groups/:productGroupId/products/:id/update', controller.updateAction);

export default router;