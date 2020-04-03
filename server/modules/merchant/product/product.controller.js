import MerchantController from '../merchant-controller';
import {
    PageProduct,
    Product,
    ProductImage,
    ProductGroupProduct
} from '../../../models';

export default class ProductController extends MerchantController {

    getResourceName() {
        return 'product'
    }

    async newPage(req) {
        const productGroup = await this._getProductGroup(req.params.productGroupId);
        return { pageParams: { productGroup }, currentPage: productGroup.page.merchantPage };
    }

    async createAction(req) {
        const productGroup = await this._getProductGroup(req.params.productGroupId);
        const { title, body, url, status, position } = req.body;
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

        return { pageParams: { productGroup, product }, currentPage: productGroup.page.merchantPage };
    }

    async editPage(req) {
        const productGroup = await this._getProductGroup(req.params.productGroupId);
        const product = await this._getProduct(req.params.id);

        const images = product.productImages;
        const image = images[0];

        const productGroupProducts = product.productGroupProducts
        const productGroupProduct = productGroupProducts.find((productGroupProduct) => productGroupProduct.productGroupId == req.params.productGroupId);
        return { pageParams: { productGroup, productGroupProduct, product, image }, currentPage: productGroup.page.merchantPage };
    }

    async updateAction(req) {
        const productGroup = await this._getProductGroup(req.params.productGroupId);
        const product = await this._getProduct(req.params.id);
        const { title, body, url, status, position } = req.body;
        product.title = title;
        product.body = body;
        product.status = status;
        await product.save();

        const images = product.productImages;
        const image = images[0];
        image.url = url;
        await image.save();

        const productGroupProducts = product.productGroupProducts
        const productGroupProduct = productGroupProducts.find((productGroupProduct) => productGroupProduct.productGroupId == req.params.productGroupId);
        productGroupProduct.position = position;
        productGroupProduct.save();

        return { currentPage: productGroup.page.merchantPage }
    }

    async _getProduct(id) {
        return await Product.findOne({
            where: { id: id },
            include: [{
                model: ProductGroupProduct,
                as: 'productGroupProducts'
            }, {
                model: ProductImage,
                as: 'productImages'
            }]
        })
    }
}

