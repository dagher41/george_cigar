import AdminViewController from '../../lib/admin-view-controller';
import {
    CatalogPage,
    ProductGroup,
    ProductGroupProduct,
    MerchantPage,
    ProductImage,
    Product
} from '../../../models';

export default class CatalogPageController extends AdminViewController {
    getResourceName() {
        return 'catalog-page';
    }

    async showPage({ catalog, params: { slug }, path }, res) {
        const page = await CatalogPage.findOne({
            where: { catalogId: catalog.id },
            include: [{
                model: MerchantPage,
                as: 'merchantPage',
                required: true,
                where: { slug }
            }, {
                model: ProductGroup,
                as: 'productGroups',
                required: false,
                attributes: ["id", "title", "subHeading", "body", "position", "status"],
                where: { status: 1 },
                include: {
                    model: Product,
                    as: 'products',
                    required: false,
                    through: { attributes: [] },
                    attributes: ['id', 'title', 'body', 'status'],
                    include: [{
                        model: ProductImage,
                        required: false,
                        as: 'productImages',
                        attributes: ['url']
                    }, {
                        model: ProductGroupProduct,
                        as: 'productGroupProducts'
                    }]
                }
            }]
        });

        super.showPage({ res, pageParams: { page }, currentPage: page.merchantPage });
    }

    _buildShowParams(req) {
        const slug = req.params.slug.trim().toLowerCase();
        return { slug, catalogId: req.catalog.id };
    }
}