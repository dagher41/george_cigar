import MerchantController from '../merchant-controller';

export default class PageSectionController extends MerchantController {

    getResourceName() {
        return 'product-group';
    }

    async newPage(req) {
        const { catalogId, pageSlug } = this._buildNewParams(req);
        const page = await this._getMerchantPage(catalogId, pageSlug);
        return { pageParams: { page }, currentPage: page }
    }

    async createAction(req) {
        const { pageSlug, catalogId, title, sub_heading: subHeading, body, position, status } = this._buildActionParams(req);
        const page = await this._getMerchantPage(catalogId, pageSlug);
        const catalogPage = page.catalogPage;
        const productGroup = await catalogPage.createProductGroup({
            title,
            subHeading,
            body,
            position,
            status
        });
        return { page, productGroup, currentPage: page };
    }

    async editPage(req) {
        const { id } = req.params;
        const productGroup = await this._getProductGroup(id);
        return { pageParams: { productGroup }, currentPage: productGroup.page.merchantPage };
    }

    async updateAction(req) {
        const { id, title, subHeading, body, position, status } = this._buildActionParams(req)
        const productGroup = await this._getProductGroup(id);
        productGroup.title = title;
        productGroup.subHeading = subHeading
        productGroup.body = body;
        productGroup.position = position;
        productGroup.status = status;
        await productGroup.save();
        return { pageParams: { productGroup }, currentPage: productGroup.page.merchantPage };
    }

    _buildNewParams(req) {
        const pageSlug = req.params.slug.trim().toLowerCase();
        return { pageSlug, catalogId: req.catalog.id };
    }

    _buildActionParams(req) {
        const { title, sub_heading: subHeading, body, position, status } = req.body;
        const pageSlug = req.params.slug;
        const catalogId = req.catalog.id;
        const id = req.params.id;
        return { id, pageSlug, catalogId, title, subHeading, body, position, status };
    }
}