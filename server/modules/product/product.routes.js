import { Router } from 'express';
import db from '../../models';
const { CategorySection, Product, CategorySectionProduct } = db;

const adminRouter = new Router();
adminRouter
    .route('/category_sections/:section_id/products/new')
    .get(async (req, res) => {
        const section = await CategorySection.find({ where: { id: req.params.section_id } })
        const category = await section.getCategory();
        res.render('pages/product/new', { currentPage: category.name, category, section })
    });

adminRouter
    .route('/category_sections/:section_id/products')
    .post(async (req, res) => {
        const section = await CategorySection.findOne({ where: { id: req.params.section_id } })
        const category = await section.getCategory();

        const { title, body, url, status, position } = req.body;
        const product = await category.createProduct({
            title,
            body,
            status
        });

        const image = await product.createProductImage({
            url,
            status: 1
        });

        console.log("position: ", position);
        const relation = await product.createCategorySectionProduct({
            category_section_id: section.id,
            position
        });

        return res.redirect(`/admin/categories/${category.slug}`);
    });

adminRouter
    .route('/products/:id/edit')
    .get(async (req, res) => {
        const product = await Product.find({
            where: { id: req.params.id },
            include: {
                model: CategorySectionProduct,
                as: 'sectionProducts'
            }
        });
        const categories = await product.getCategories();
        const category = categories[0];

        const images = await product.getProductImages();
        const image = images[0];

        res.render('pages/product/edit', { currentPage: category.name, category, product, image });
    });

adminRouter
    .route('/products/:id/update')
    .put(async (req, res) => {
        const product = await Product.find({ where: { id: req.params.id } });
        const { title, body, url, status, position } = req.body;
        product.title = title;
        product.body = body;
        product.status = status;
        await product.save();

        const images = await product.getProductImages();
        const image = images[0];
        image.url = url;
        await image.save();

        const relations = await product.getSectionProducts();
        const relation = relations[0]
        relation.position = position;
        relation.save();

        const categories = await product.getCategories()
        const category = categories[0]
        return res.redirect(`/admin/categories/${category.slug}`)
    });
export default { admin: adminRouter };