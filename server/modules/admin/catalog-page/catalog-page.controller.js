import AdminControllerBase from '../../lib/admin-view-controller';

import {
  Catalog,
  CatalogPage,
  MerchantPage
} from '../../../models';

export default class CatalogPageController extends AdminControllerBase {
  getResourceName() {
    return 'catalog-page';
  }

  async newPage({ catalog, params: { catalogId } }, res) {
    const currentCatalog = await Catalog.findByPk(catalogId, { attributes: ['id', 'name'] });
    const catalogPage = new CatalogPage();
    const merchantPage = new MerchantPage();
    const tempalateTypes = Object.values(CatalogPage.TEMPLATE_IDS)
    const classificationTypes = Object.values(MerchantPage.CLASSIFICATION_TYPES);

    const currentNav = await this._getMerchantPage(catalog.id, 'catalogs');
    const pageParams = { currentCatalog, catalogPage, merchantPage, tempalateTypes, classificationTypes };
    super.newPage({ res, pageParams, currentPage: currentNav });
  }

  async createAction({ params: { catalogId }, body: { catalog_page: catalogPage, merchant_page: merchantPage } }, res) {
    const { name, slug, position, publicVisible, templateId, clientMetadata } = catalogPage;
    const newPage = new CatalogPage();
    newPage.name = name;
    newPage.slug = slug;
    newPage.position = position;
    newPage.publicVisible = publicVisible;
    newPage.templateId = templateId;
    newPage.clientMetadata = clientMetadata;
    newPage.catalogId = catalogId;
    await newPage.save();

    if (merchantPage.name) {
      const newMerchantPage = new MerchantPage();
      newMerchantPage.name = merchantPage.name;
      newMerchantPage.slug = merchantPage.slug;
      newMerchantPage.position = merchantPage.position;
      newMerchantPage.classification = merchantPage.classification;
      newMerchantPage.catalogPageId = newPage.id;
      await newMerchantPage.save();
    }

    return super.createAction({ res, redirectPath: `/admin/catalogs/${catalogId}` });
  }

  async editPage({ catalog, params: { id } }, res) {
    const catalogPage = await CatalogPage.findByPk(id, {
      include: [{
        model: MerchantPage,
        as: 'merchantPage',
        required: false,
        attributes: ['name', 'position', 'slug', 'classification']
      }, {
        model: Catalog,
        as: 'catalog',
        required: true,
        attributes: ['name']
      }]
    });
    const tempalateTypes = Object.values(CatalogPage.TEMPLATE_IDS)
    const classificationTypes = Object.values(MerchantPage.CLASSIFICATION_TYPES);

    const currentNav = await this._getMerchantPage(catalog.id, 'catalogs');
    super.editPage({ res, pageParams: { catalogPage, tempalateTypes, classificationTypes }, currentPage: currentNav });
  }

  async updateAction({ params: { id }, body: { catalog_page: catalogPage, merchant_page: merchantPage } }, res) {
    const { name, slug, position, publicVisible, templateId, clientMetadata } = catalogPage;

    const page = await CatalogPage.findByPk(id, {
      include: {
        model: MerchantPage,
        as: 'merchantPage',
        required: false,
      }
    });
    page.name = name;
    page.slug = slug;
    page.position = position;
    page.publicVisible = publicVisible;
    page.clientMetadata = clientMetadata;
    page.templateId = templateId;

    const promises = [page.save()];

    if (merchantPage) {
      page.merchantPage.name = merchantPage.name;
      page.merchantPage.slug = merchantPage.slug;
      page.merchantPage.position = merchantPage.position;
      page.merchantPage.classification = merchantPage.classification;
      promises.push(page.merchantPage.save());
    }

    await Promise.all(promises);

    return super.updateAction({ res, redirectPath: `/admin/catalogs/${page.catalogId}` });
  }
}