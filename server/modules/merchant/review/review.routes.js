import ReviewController from './review.controller';

const { router } = ReviewController.buildResource('reviews', ['index', 'new', 'create', 'edit', 'update']);

export default router;