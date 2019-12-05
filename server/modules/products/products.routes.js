import { Router } from 'express';
import db from '../../models';
const { Category, ProductImage, Product} = db;

const router = new Router();
router
    .route('/:category_slug/products')
    .get(async (req, res) => {
        const category = await Category.find({ where: { slug: req.params.category_slug.trim().toLowerCase() } })
        res.json(await category.getProducts({
            attributes: ['id', 'title', 'body', 'createdAt', 'updatedAt'],
            joinTableAttributes: [],
            include: [{
                model: ProductImage,
                as: 'productImages',
                attributes: ['id', 'url', 'createdAt', 'updatedAt']
            }]
        }));
    });

const adminRouter = new Router();

adminRouter
    .route('/:category_slug/products')
    .get(async (req, res) => {
        const category = await Category.find({ where: { slug: req.params.category_slug.trim().toLowerCase() } });
        const products = await category.getProducts({
            attributes: ['id', 'title', 'body', 'createdAt', 'updatedAt'],
            joinTableAttributes: [],
            include: [{
                model: ProductImage,
                as: 'productImages',
                attributes: ['id', 'url', 'createdAt', 'updatedAt']
            }]
        })

        res.render('pages/product/index', {category, products})
    });    

adminRouter
    .route('/:category_slug/products/new')
    .get(async (req, res) => {
        const category = await Category.find({ where: { slug: req.params.category_slug.trim().toLowerCase() } });
        res.render('pages/product/new', {category})
    });

adminRouter
    .route('/:category_slug/products/')
    .post(async (req, res) => {
        const category = await Category.find({ where: { slug: req.params.category_slug.trim().toLowerCase() } });

        const {title, body, url} = req.body;
        const product = await category.createProduct({
            title: title,
            body: body,
            status: 1
        });

        const image = await product.createProductImage({
            url: url,
            status: 1
        });

        return res.redirect(`/admin/${category.slug}/products`);
    });

adminRouter
    .route('/products/:id/edit')
    .get(async (req, res) => {
        const product = await Product.find({ where: { id: req.params.id } });
        const categories = await product.getCategories();
        const category = categories[0];

        const images = await product.getProductImages();
        const image = images[0];

        res.render('pages/product/edit', {category, product, image});
    });

adminRouter
    .route('/products/:id/update')
    .put(async (req, res) => {
        const product = await Product.find({ where: { id: req.params.id } });
        const {title, body, url} = req.body;
        product.title = title;
        product.body = body;
        await product.save();

        const images = await product.getProductImages();
        const image = images[0];
        image.url = url;
        await image.save();

        const categories = await product.getCategories()
        const category = categories[0]
        return res.redirect(`/admin/${category.slug}/products`)
    });    
export default { api : router, admin: adminRouter };