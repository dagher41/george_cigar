import { CatalogPage, ProductGroup, MerchantPage } from '../../models';

export default class MerchantController {

    async _getProductGroup(id) {
        return await ProductGroup.findOne({
            where: { id },
            include: {
                model: CatalogPage,
                as: 'page',
                include: {
                    model: MerchantPage,
                    as: 'merchantPage'
                }
            }
        });
    }

    async _getMerchantPage(catalogId, slug) {
        return await MerchantPage.findOne({
            where: { slug },
            include: {
                model: CatalogPage,
                as: 'catalogPage',
                where: { catalogId }
            }
        })
    }
}