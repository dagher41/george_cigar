import AdminViewController from '../../lib/admin-view-controller'
import _reduce from 'lodash/reduce'

import {
  Catalog,
  Role,
  User,
  UserCatalog
} from '../../../models';

export default class UserCatalogController extends AdminViewController {
  getResourceName() {
    return 'user-catalog';
  }

  async editPage({ catalog, params: { catalogId } }, res) {
    const currentCatalog = await Catalog.findByPk(catalogId, {
      attributes: ['id', 'name'],
      include: {
        model: UserCatalog,
        as: 'userCatalogs',
        required: false,
        attributes: ['userId'],
        include: {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName']
        }
      }
    });

    const catalogMapping = _reduce(currentCatalog.userCatalogs, (curr, elem) => {
      curr[elem.userId] = elem.user
      return curr;
    }, {});

    const merchants = await User.findAll({
      order: [['lastName', 'ASC']],
      include: {
        model: Role,
        where: { code: Role.ROLE_CODES.merchant },
        required: true
      }
    });

    const page = await this._getMerchantPage(catalog.id, 'catalogs');
    super.editPage({ res, pageParams: { currentCatalog, merchants, catalogMapping }, currentPage: page })
  }

  async updateAction({ catalog, params: { catalogId }, body: { user_ids: userIds } }, res) {
    const currentCatalog = await Catalog.findByPk(catalogId, {
      attributes: ['id'],
    });
    const users = await User.findAll({ where: { id: userIds || [] }, attributes: ['id'] });
    await UserCatalog.destroy({ where: { catalogId: currentCatalog.id } });
    await UserCatalog.bulkCreate(users.map(user => Object.create({ user_id: user.id, catalog_id: currentCatalog.id, roleCode: Role.ROLE_CODES.merchant })));
    const page = await this._getMerchantPage(catalog.id, 'catalogs');
    super.updateAction({ res, currentPage: page });
  }
}