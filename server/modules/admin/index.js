import Express from 'express';
import BodyParser from 'body-parser';
import EnsureLoggedIn from 'connect-ensure-login';

import catalogOwnership from '../lib/middleware/catalog-ownership';
import userRoutes from './user/user.routes';
import catalogRoutes from './catalog/catalog.routes';
import catalogPageRoutes from './catalog-page/catalog-page.routes';
import userCatalogRoutes from './user-catalogs/user-catalogs.routes';

const app = new Express();

app.set('view engine', 'pug');
app.set('views', './server/modules/admin/views');

app.use('/admin', [
  EnsureLoggedIn.ensureLoggedIn('/merchant/login'),
  BodyParser.urlencoded({ extended: true }),
  catalogOwnership,
  userRoutes,
  catalogRoutes,
  catalogPageRoutes,
  userCatalogRoutes
]);

export default app;