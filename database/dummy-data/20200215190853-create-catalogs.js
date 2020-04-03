import {
  Catalog,
  CatalogPage,
  MerchantPage,
  User
} from '../../server/models';
import georgeCigar from './catalog-json/george-cigar';
import mikesGlassAndGifts from './catalog-json/mikes-glass-and-gifts';

module.exports = {
  up: async () => {
    const catalogs = [georgeCigar, mikesGlassAndGifts];

    for (const catalog of catalogs) {
      const user = await User.findOne({ where: { email: catalog.user.email } });
      await user.createCatalog(catalog.catalog);
      const catalogInstance = await Catalog.findOne({ where: { name: catalog.catalog.name } });
      for (const page of catalog.catalogPages) {
        await CatalogPage.create({ ...page, catalogId: catalogInstance.id }, {
          include: {
            model: MerchantPage,
            as: 'merchantPage'
          }
        });
      }
    }
  },

  down: async () => {
    return Promise.resolve();
  }
};