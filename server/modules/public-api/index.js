import Express from 'express';
import bodyParser from 'body-parser';

import catalogPageRoutes from './catalog-page/catalog-page.routes';
import reviewRoutes from './review/review.routes';
import messageRoutes from './message/message.routes';

const app = new Express();

app.use('/api', bodyParser.json({ limit: '20mb' }));
app.use('/api', [catalogPageRoutes, reviewRoutes, messageRoutes])

export default app;