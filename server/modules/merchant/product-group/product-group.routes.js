import ProductGroupController from './product-group.controller';

const { router, controller } = ProductGroupController.buildResource('pages', []);

router
  .get('/pages/:slug/product_group/new', controller.newPage)
  .post('/pages/:slug/product_groups', controller.createAction)
  .get('/product_groups/:id/edit', controller.editPage)
  .put('/product_groups/:id/update', controller.updateAction);

export default router;