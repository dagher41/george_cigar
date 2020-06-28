import AdminViewController from '../../lib/admin-view-controller';

import { CatalogPage, MerchantPage } from '../../../models';

export default class ProductGroupController extends AdminViewController {

    getResourceName() {
        return 'product-group';
    }

    async newPage({ catalog, params: { slug } }, res) {
        const page = await CatalogPage.findOne({
            where: { slug: slug && slug.trim().toLowerCase(), catalogId: catalog.id },
            include: {
                model: MerchantPage,
                as: 'merchantPage',
                required: true,
            }
        });
        return super.newPage({ res, pageParams: { page }, currentPage: page.merchantPage });
    }

    async createAction({ catalog, params: { slug }, body: { title, body, position, status, sub_heading: subHeading } }, res) {
        const page = await CatalogPage.findOne({
            where: { slug: slug && slug.trim().toLowerCase(), catalogId: catalog.id },
            include: {
                model: MerchantPage,
                as: 'merchantPage',
                required: true,
            }
        });
        await page.createProductGroup({
            title,
            subHeading,
            body,
            position,
            status
        });
        return super.createAction({ res, currentPage: page.merchantPage });
    }

    async editPage({ params: { id } }, res) {
        const productGroup = await this._getProductGroup(id);
        return super.editPage({ res, pageParams: { productGroup }, currentPage: productGroup.page.merchantPage });
    }

    async updateAction({ params: { id }, body: { title, sub_heading: subHeading, body, position, status } }, res) {
        const productGroup = await this._getProductGroup(id);
        productGroup.title = title;
        productGroup.subHeading = subHeading
        productGroup.body = body;
        productGroup.position = position;
        productGroup.status = status;
        await productGroup.save();
        return super.updateAction({ res, pageParams: { productGroup }, currentPage: productGroup.page.merchantPage });
    }
}