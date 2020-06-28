import CatalogPageController from './catalog-page.controller';

const { router, controller } = CatalogPageController.buildResource('catalog_pages', ['edit', 'update']);

router.get('/catalogs/:catalogId/catalog_pages/new', controller.newPage)
  .post('/catalogs/:catalogId/catalog_pages', controller.createAction);

export default router;