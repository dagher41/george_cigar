import CatalogPageController from './catalog-page.controller';

const { router } = CatalogPageController.buildResource('pages', ['show'], { resourceIdentifier: 'slug' })

export default router;