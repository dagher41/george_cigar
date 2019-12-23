import { Router } from 'express';
import db from '../../models';
const { Category, ProductImage, Product, CategorySection } = db;

const apiRouter = new Router();
apiRouter
    .route('/categories/:slug')
    .get(async (req, res) => {
        const category = await Category.findOne({
            order: [['sections', 'position', 'ASC']],
            where: { slug: req.params.slug.trim().toLowerCase() },
            attributes: ["slug", "name"],
            include: {
                model: CategorySection,
                as: 'sections',
                required: true,
                attributes: ["id", "title", "subHeading", "body", "position"],
                where: { status: 1 },
                include: {
                    model: Product,
                    as: 'products',
                    required: true,
                    through: { attributes: [] },
                    where: { status: 1 },
                    attributes: ['id', 'title', 'body'],
                    include: {
                        model: ProductImage,
                        required: true,
                        as: 'productImages',
                        attributes: ['id', 'url', 'createdAt', 'updatedAt']
                    }
                }
            }
        });

        res.json(category);
    });

const adminRouter = new Router();

adminRouter
    .route('/categories/:slug')
    .get(async (req, res) => {
        const category = await Category.findOne({
            where: { slug: req.params.slug }
        });
        const sections = await category.getSections({
            joinTableAttributes: [],
            include: [{
                model: Product,
                as: 'products'
            }],
            order: [['position', 'ASC']]
        });

        res.render('pages/category/show', { currentPage: category.name, category, sections })
    });
export default { api: apiRouter, admin: adminRouter };