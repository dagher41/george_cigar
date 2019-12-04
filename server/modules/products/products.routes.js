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

const adminRouter = new Router();
adminRouter
    .route('/products/new')
    .get((_, res) => {
        res.render('pages/product/new')
    });

adminRouter
    .route('/:tag/products')
    .get(async (req, res) => {
        const tag = await Tag.find({ where: { name: req.params.tag.trim().toLowerCase() } });
        const products = await tag.getProducts({
            attributes: ['id', 'title', 'body', 'createdAt', 'updatedAt'],
            joinTableAttributes: [],
            include: [{
                model: ProductImage,
                as: 'productImages',
                attributes: ['id', 'url', 'createdAt', 'updatedAt']
            }]
        })

        res.render('pages/product/index')
    });    

export default { api : router, admin: adminRouter };