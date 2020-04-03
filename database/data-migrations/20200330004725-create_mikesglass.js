import {
  Catalog,
  CatalogPage,
  MerchantPage,
  User
} from '../../server/models';
import mikesGlassAndGifts from '../dummy-data/catalog-json/mikes-glass-and-gifts';

module.exports = {
  up: async () => {
    const user = await User.findOne({ where: { id: 3 } });
    await user.createCatalog(mikesGlassAndGifts.catalog);
    const catalog = await Catalog.findOne({ where: { name: mikesGlassAndGifts.catalog.name } });
    for (const page of mikesGlassAndGifts.catalogPages) {
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
