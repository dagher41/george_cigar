import Express from 'express';
import BodyParser from 'body-parser';

import catalogRoutes from './catalog/catalog.routes';
import catalogPageRoutes from './catalog-page/catalog-page.routes';
import reviewRoutes from './review/review.routes';
import messageRoutes from './message/message.routes';

const app = new Express();

app.use('/api', [
  BodyParser.json({ limit: '20mb' }),
  catalogPageRoutes,
  reviewRoutes,
  messageRoutes
]);
app.use(catalogRoutes);

export default app;