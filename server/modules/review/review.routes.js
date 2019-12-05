import { Router } from 'express';
import db from '../../models';
const { Review } = db;

const apiRouter = new Router();
apiRouter
    .route('/reviews')
    .get(async (_, res) => {
        res.json(await Review.findAll({where: {status: 1}, order: [['position', 'ASC']]}));
    });

const adminRouter = new Router();
adminRouter
    .route('/reviews')
    .get(async (req, res) => {
        const reviews = await Review.findAll({order: [['status', 'DESC'], ['position', 'ASC']]});
        res.render('pages/review/index', {category: {slug: 'reviews'}, reviews})
    });

adminRouter
    .route('/reviews/new')
    .get(async (_, res) => {
        res.render('pages/review/new', {category: {slug: 'reviews'}});
    });

adminRouter
    .route('/reviews')
    .post(async (req, res) => {
        const {author_name: authorName , body, source, position, status} = req.body;
        const review = await Review.create({authorName, body, source, position, status});

        return res.redirect('/admin/reviews');
    });

adminRouter
    .route('/reviews/:id/edit')
    .get(async (req, res) => {
        const review = await Review.find({where: {id: req.params.id}})
        res.render('pages/review/edit', {category: {slug: 'reviews'}, review});
    });

adminRouter
    .route('/reviews/:id/update')
    .put(async (req, res) => {
        const {author_name: authorName , body, source, position, status} = req.body;
        const review = await Review.find({where: {id: req.params.id}});
        review.authorName = authorName;
        review.body = body;
        review.source = source;
        review.position = position;
        review.status = status;
        await review.save();

        return res.redirect('/admin/reviews');
    });

export default {api: apiRouter, admin: adminRouter};    