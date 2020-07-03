import AdminViewController from '../../lib/admin-view-controller';
import {
    CatalogPage,
    PageProduct,
    Product,
    ProductImage,
    ProductGroup,
    ProductGroupProduct
} from '../../../models';

export default class ProductController extends AdminViewController {

    getResourceName() {
        return 'product'
    }

    async newPage({ catalog: { id }, params: { productGroupId } }, res) {
        const productGroup = await this._getProductGroup(productGroupId, id);
        return super.newPage({ res, pageParams: { productGroup }, currentPage: productGroup.page.merchantPage });
    }

    async createAction({ catalog: { id }, params: { productGroupId }, body: { title, body, url, status, position } }, res) {
        const productGroup = await this._getProductGroup(productGroupId, id);
        const product = await Product.create({
            title,
            body,
            status,
            productImages: [{ url, status: 1 }],
            productGroupProducts: [{ product_group_id: productGroup.id, position }],
            pageProducts: [{ catalog_page_id: productGroup.catalogPageId }]
        }, {
            include: [{
                model: ProductImage,
                as: 'productImages'
            }, {
                model: ProductGroupProduct,
                as: 'productGroupProducts'
            }, {
                model: PageProduct,
                as: 'pageProducts'
            }]
        });

        return super.createAction({ res, pageParams: { productGroup, product }, currentPage: productGroup.page.merchantPage });
    }

    async editPage({ catalog: { id: catalogId }, params: { productGroupId, id } }, res) {
        const productGroup = await this._getProductGroup(productGroupId, catalogId);
        const product = await this._getProduct(id, catalogId);

        const images = product.productImages;
        const image = images[0];

        const productGroupProducts = product.productGroupProducts
        const productGroupProduct = productGroupProducts.find((productGroupProduct) => productGroupProduct.productGroupId == productGroupId);
        return super.editPage({ res, pageParams: { productGroup, productGroupProduct, product, image }, currentPage: productGroup.page.merchantPage });
    }

    async updateAction({ catalog: { id: catalogId }, params: { productGroupId, id }, body: { title, body, url, status, position } }, res) {
        const productGroup = await this._getProductGroup(productGroupId, catalogId);
        const product = await this._getProduct(id, catalogId);

        product.title = title;
        product.body = body;
        product.status = status;
        await product.save();

        const { productImages, productGroupProducts } = product;
        const image = productImages[0];
        image.url = url;
        await image.save();

        const { id: productGroupProductId } = productGroupProducts.find((productGroupProduct) => productGroupProduct.productGroupId == productGroupId);
        await ProductGroupProduct.update({ position }, { where: { id: productGroupProductId } })

        return super.updateAction({ res, currentPage: productGroup.page.merchantPage });
    }

    async _getProduct(id, catalogId) {
        return await Product.findByPk(id, {
            attributes: ['id', 'title', 'body', 'status'],
            include: [{
                model: ProductGroupProduct,
                as: 'productGroupProducts',
                required: true,
                attributes: ['id', 'position', 'productGroupId'],
                include: {
                    model: ProductGroup,
                    as: 'productGroup',
                    attributes: [],
                    required: true,
                    include: {
                        model: CatalogPage,
                        as: 'page',
                        where: { catalogId },
                        attributes: [],
                        required: true
                    }
                }
            }, {
                model: ProductImage,
                as: 'productImages',
                attributes: ['id', 'url']
            }]
        })
    }
}

