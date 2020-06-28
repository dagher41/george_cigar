import Express from 'express';
import BodyParser from 'body-parser';
import EnsureLoggedIn from 'connect-ensure-login';

import catalogOwnership from '../lib/middleware/catalog-ownership';
import sessionRoutes from './session/session.routes';
import catalogPageRoutes from './catalog-page/catalog-page.routes';
import productGroupRoutes from './product-group/product-group.routes';
import messageRoutes from './message/message.routes';
import productRoutes from './product/product.routes';
import reviewRoutes from './review/review.routes';

const app = new Express();

app.set('view engine', 'pug');
app.set('views', './server/modules/merchant/views');

app.use('/merchant', BodyParser.urlencoded({ extended: true }));
app.use('/merchant', [sessionRoutes]);
app.use('/merchant', EnsureLoggedIn.ensureLoggedIn('/merchant/login'));
app.use('/merchant', catalogOwnership)
app.use('/merchant', [
    catalogPageRoutes,
    productGroupRoutes,
    messageRoutes,
    productRoutes,
    reviewRoutes
]);

export default app;