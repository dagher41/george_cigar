import { Router } from 'express';
import { Review } from '../../../models';

const router = new Router();
router
    .route('/reviews')
    .get(async (req, res) => {
        res.json(await Review.findAll({
            where: { status: 1, catalogId: req.catalog.id },
            order: [['position', 'ASC']]
        }));
    });

export default router;