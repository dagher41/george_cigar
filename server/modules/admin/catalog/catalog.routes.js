
import CatalogController from './catalog.controler';

const { router } = CatalogController.buildResource('catalogs', ['index', 'new', 'create', 'show', 'edit', 'update'])

export default router;

