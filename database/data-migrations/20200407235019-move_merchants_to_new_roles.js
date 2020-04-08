'use strict';
import { Catalog, UserCatalog, Role } from '../../server/models';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let catalog = await Catalog.findOne({ where: { hostname: 'georgecigar.com' } });
    let userCatalog = await UserCatalog.findOne({ where: { catalogId: catalog.id } });
    userCatalog.roleCode = Role.ROLE_CODES.merchant
    await userCatalog.save();

    catalog = await Catalog.findOne({ where: { hostname: 'mikesglassandgifts.com' } });
    userCatalog = await UserCatalog.findOne({ where: { catalogId: catalog.id } });
    userCatalog.roleCode = Role.ROLE_CODES.merchant
    await userCatalog.save();
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve();
  }
};
