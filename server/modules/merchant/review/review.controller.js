import MerchantController from '../merchant-controller';
import { Review } from '../../../models';

export default class ReviewController extends MerchantController {
    getResourceName() {
        return 'review'
    }

    async indexPage(req) {
        const page = await this._getMerchantPage(req.catalog.id, 'reviews');
        const reviews = await Review.findAll({
            where: { catalogId: req.catalog.id },
            order: [['status', 'DESC'], ['position', 'ASC']]
        });
        return { pageParams: { reviews }, currentPage: page };
    }

    async newPage(req) {
        const page = await this._getMerchantPage(req.catalog.id, 'reviews');
        return { pageParams: {}, currentPage: page }
    }

    async createAction(req) {
        const { author_name: authorName, body, source, position, status } = req.body;
        const review = await Review.create({ authorName, body, source, position, status, catalogId: req.catalog.id });
        const page = await this._getMerchantPage(req.catalog.id, 'reviews');
        return { review, currentPage: page };
    }

    async editPage(req) {
        const review = await Review.findOne({ where: { id: req.params.id } });
        const page = await this._getMerchantPage(req.catalog.id, 'reviews');
        return { pageParams: { review }, currentPage: page }
    }

    async updateAction(req) {
        const { author_name: authorName, body, source, position, status } = req.body;
        const review = await Review.findOne({ where: { id: req.params.id } });
        review.authorName = authorName;
        review.body = body;
        review.source = source;
        review.position = position;
        review.status = status;
        await review.save();
        const page = await this._getMerchantPage(req.catalog.id, 'reviews');
        return { review, currentPage: page };
    }
}