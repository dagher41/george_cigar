import RouteBuilder from '../route-builder';
import MessageController from './message.controller';

const router = RouteBuilder(MessageController, (router) => {
    router
        .route('/messages')
        .get(router.indexPage);
});

export default router;