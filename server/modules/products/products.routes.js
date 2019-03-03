import { Router } from 'express';
import db from '../../models';
const { Tag, ProductImage } = db;

const router = new Router();
router
    .route('/:tag/products')
    .get(async (req, res) => {
        const tag = await Tag.find({ where: { name: req.params.tag.trim().toLowerCase() } })
        res.json(await tag.getProducts({
            attributes: ['id', 'title', 'body', 'createdAt', 'updatedAt'],
            joinTableAttributes: [],
            include: [{
                model: ProductImage,
                as: 'productImages',
                attributes: ['id', 'url', 'createdAt', 'updatedAt']

            }]
        }));
    })

export default router;