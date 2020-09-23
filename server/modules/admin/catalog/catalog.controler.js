import AdminViewController from '../../lib/admin-view-controller';
import {
  Catalog,
  CatalogPage
} from '../../../models';

export default class CatalogController extends AdminViewController {
  getResourceName() {
    return 'catalog';
  }

  async indexPage({ catalog }, res) {
    const catalogs = await Catalog.findAll({
      attributes: ['id', 'name', 'hostname', 'status', 'createdAt'],
      order: [['id', 'ASC']]
    });

    const page = await this._getMerchantPage(catalog.id, 'catalogs');
    super.indexPage({ res, pageParams: { catalogs }, currentPage: page });
  }

  async newPage({ catalog }, res) {
    const page = await this._getMerchantPage(catalog.id, 'catalogs');
    super.newPage({ res, pageParams: {}, currentPage: page });
  }

  async createAction({ catalog, body }, res) {
    const newCatalog = new Catalog();
    this._setCommonVariables(newCatalog, body);
    newCatalog.save();

    const page = await this._getMerchantPage(catalog.id, 'catalogs');
    super.createAction({ res, currentPage: page });
  }

  async showPage({ catalog, params: { id } }, res) {
    const currentCatalog = await Catalog.findByPk(id, {
      attributes: ['id', 'name'],
      include: {
        model: CatalogPage,
        as: 'catalogPages',
        attributes: ['id', 'position', 'name', 'slug', 'publicVisible']
      },
      order: [['catalogPages', 'position', 'ASC']]
    });

    const page = await this._getMerchantPage(catalog.id, 'catalogs');
    super.showPage({ res, pageParams: { currentCatalog }, currentPage: page });
  }

  async editPage({ catalog, params: { id } }, res) {
    const currentCatalog = await Catalog.findByPk(id, {});

    const page = await this._getMerchantPage(catalog.id, 'catalogs');
    super.editPage({ res, pageParams: { currentCatalog }, currentPage: page });
  }

  async updateAction({ catalog, params: { id }, body }, res) {
    const currentCatalog = await Catalog.findByPk(id, {});
    this._setCommonVariables(currentCatalog, body);
    await currentCatalog.save();

    const page = await this._getMerchantPage(catalog.id, 'catalogs');
    super.updateAction({ res, currentPage: page });
  }

  _setCommonVariables(catalog, { name, hostname, status, logoSrc, faviconPrefix, address, social, contact }) {
    catalog.name = name;
    catalog.hostname = hostname;
    catalog.status = status;
    catalog.logoSrc = logoSrc;
    catalog.faviconPrefix = faviconPrefix;
    catalog.address = address;
    catalog.social = social;
    catalog.contact = contact;
  }
}