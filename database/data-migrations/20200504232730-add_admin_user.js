'use strict';
import bcrypt from 'bcrypt';
import {
  Catalog,
  CatalogPage,
  MerchantPage,
  User,
  Role
} from '../../server/models';
import gnWebSolutions from '../dummy-data/catalog-json/gn-web-solutions';

module.exports = {
  up: async () => {
    const password = bcrypt.hashSync(process.env.USER_PASSWORD, 10);
    const user = await User.create({
      firstName: 'Tom',
      lastName: 'Ford',
      email: process.env.USER_EMAIL,
      password: password
    });
    const admin = await Role.findOne({ where: { code: Role.ROLE_CODES.administrator } });
    await user.addRole(admin);

    const catalog = await Catalog.create(gnWebSolutions.catalog);
    await user.createUserCatalog({
      catalog_id: catalog.id,
      roleCode: Role.ROLE_CODES.administrator
    });

    for (const page of gnWebSolutions.catalogPages) {
      await CatalogPage.create({ ...page, catalogId: catalog.id }, {
        include: {
          model: MerchantPage,
          as: 'merchantPage'
        }
      });
    }
  },

  down: () => {
    return Promise.resolve();
  }
};
