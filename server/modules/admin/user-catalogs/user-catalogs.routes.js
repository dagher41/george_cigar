import UserCatalogController from './user-catalogs.controller';

const { router, controller } = UserCatalogController.buildResource('user_catalogs', ['edit', 'update'], { resourceIdentifier: 'catalogId' });

export default router;