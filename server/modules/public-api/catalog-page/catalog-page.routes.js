import { Router } from 'express';
import {
    CatalogPage,
    ProductImage,
    Product,
    ProductGroup,
    ProductGroupProduct
} from '../../../models';

const router = new Router();
router
    .route('/pages/:slug')
    .get(async (req, res) => {
        const page = await CatalogPage.findOne({
            order: [['productGroups', 'position', 'ASC'], ['productGroups', 'products', 'productGroupProducts', 'position', 'ASC']],
            where: { slug: req.params.slug.trim().toLowerCase(), catalogId: req.catalog.id },
            attributes: ["slug", "name"],
            include: {
                model: ProductGroup,
                as: 'productGroups',
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
                    include: [{
                        model: ProductImage,
                        required: true,
                        as: 'productImages',
                        attributes: ['id', 'url', 'createdAt', 'updatedAt']
                    }, {
                        model: ProductGroupProduct,
                        as: 'productGroupProducts'
                    }]
                }
            }
        });

        res.json(page);
    });

export default router;