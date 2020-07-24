import _keyBy from 'lodash/keyBy'
import AdminViewController from '../../lib/admin-view-controller';
import {
  BusinessHour,
  Catalog
} from '../../../models';

export default class CatalogViewController extends AdminViewController {
  getResourceName() {
    return 'catalog'
  }

  async showPage({ catalog }, res) {
    const catalogVM = await Catalog.findByPk(catalog.id, {
      attributes: ['name', 'contact'],
      include: [{
        model: BusinessHour,
        as: 'businessHours',
        attributes: ['openTime', 'closeTime', 'dayOfWeek']
      }]
    });

    const hourMap = _keyBy(catalogVM.businessHours, 'dayOfWeek');
    const currentPage = await this._getMerchantPage(catalog.id, 'catalog');
    return super.showPage({ res, pageParams: { catalogVM, DAY_MAPPING: BusinessHour.getDayMapping(), hourMap }, currentPage })
  }

  async updateAction({ catalog }, res) {
    const catalogVM = await Catalog.findByPk(catalog.id, {
      attributes: ['name', 'contact'],
    });
  }
}