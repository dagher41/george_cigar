import CatalogViewController from './catalog.controller';

const { router, controller } = CatalogViewController.buildResource('catalogs', [])

router.get('/catalog', controller.showPage)
  .put('/catalog', controller.updateAction);

export default router;