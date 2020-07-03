import AdminViewController from '../../lib/admin-view-controller';
import { Review } from '../../../models';

export default class ReviewController extends AdminViewController {
    getResourceName() {
        return 'review'
    }

    async indexPage(req, res) {
        const page = await this._getMerchantPage(req.catalog.id, 'reviews');
        const reviews = await Review.findAll({
            where: { catalogId: req.catalog.id },
            order: [['status', 'DESC'], ['position', 'ASC']]
        });
        return super.indexPage({ res, pageParams: { reviews }, currentPage: page });
    }

    async newPage(req, res) {
        const page = await this._getMerchantPage(req.catalog.id, 'reviews');
        return super.newPage({ res, pageParams: {}, currentPage: page });
    }

    async createAction(req, res) {
        const { author_name: authorName, body, source, position, status } = req.body;
        const review = await Review.create({ authorName, body, source, position, status, catalogId: req.catalog.id });
        const page = await this._getMerchantPage(req.catalog.id, 'reviews');
        return super.createAction({ res, currentPage: page });
    }

    async editPage(req, res) {
        const review = await Review.findByPk(req.params.id);
        const page = await this._getMerchantPage(req.catalog.id, 'reviews');
        return super.editPage({ res, pageParams: { review }, currentPage: page });
    }

    async updateAction(req, res) {
        const { author_name: authorName, body, source, position, status } = req.body;
        const review = await Review.findByPk(req.params.id);
        review.authorName = authorName;
        review.body = body;
        review.source = source;
        review.position = position;
        review.status = status;
        await review.save();
        const page = await this._getMerchantPage(req.catalog.id, 'reviews');
        return super.updateAction({ res, review, currentPage: page });
    }
}