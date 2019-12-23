import { Router } from 'express';
import db from '../../models';
const { Category, CategorySection } = db;

const adminRouter = new Router();

adminRouter
    .route('/categories/:slug/category_section/new')
    .get(async (req, res) => {
        const category = await Category.find({ where: { slug: req.params.slug } });

        res.render('pages/category-section/new', { currentPage: category.name, category })
    });

adminRouter
    .route('/categories/:slug/category-sections')
    .post(async (req, res) => {
        const category = await Category.find({ where: { slug: req.params.slug } });
        const { title, sub_heading: subHeading, body, position, status } = req.body;
        await category.createSection({
            title,
            subHeading,
            body,
            position,
            status
        });

        return res.redirect(`/admin/categories/${category.slug}`);
    });

adminRouter
    .route('/category_sections/:id/edit')
    .get(async (req, res) => {
        const section = await CategorySection.find({ where: { id: req.params.id } });
        const category = await section.getCategory();

        res.render('pages/category-section/edit', { currentPage: category.name, category, section });
    });

adminRouter
    .route('/category_sections/:id/update')
    .put(async (req, res) => {
        const section = await CategorySection.find({ where: { id: req.params.id } });
        const category = await section.getCategory();
        const { title, sub_heading: subHeading, body, position, status } = req.body;
        section.title = title;
        section.subHeading = subHeading
        section.body = body;
        section.position = position;
        section.status = status;
        await section.save();

        return res.redirect(`/admin/categories/${category.slug}`)
    });
export default { admin: adminRouter };