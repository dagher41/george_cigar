import RouteBuilder from '../route-builder';
import ReviewController from './review.controller';

const router = RouteBuilder(ReviewController, (router) => {
    router
        .route('/reviews')
        .get(router.indexPage);

    router
        .route('/reviews/new')
        .get(router.newPage);

    router
        .route('/reviews')
        .post(router.createAction);

    router
        .route('/reviews/:id/edit')
        .get(router.editPage);

    router
        .route('/reviews/:id/update')
        .put(router.updateAction);
});

export default router;