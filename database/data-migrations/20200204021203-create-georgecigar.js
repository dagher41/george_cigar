import {
  Catalog,
  CatalogPage,
  Message,
  MerchantPage,
  User,
  Role,
  Review
} from '../../server/models';
import georgeCigar from '../dummy-data/catalog-json/george-cigar';

module.exports = {
  up: async () => {
    const catalog = await Catalog.create(georgeCigar.catalog)
    const currentPages = await CatalogPage.findAll({ where: { catalogId: null } });

    for (const page of currentPages) {
      const pageData = georgeCigar.catalogPages.find(item => item.slug == page.slug);
      page.catalogId = catalog.id;
      page.publicVisible = true;
      page.position = pageData.position;
      page.templateId = pageData.templateId;
      page.clientMetadata = pageData.clientMetadata;

      const merchantPage = MerchantPage.build();
      merchantPage.name = page.name;
      merchantPage.slug = page.slug;
      merchantPage.catalogPageId = page.id;
      merchantPage.position = page.position - 10;
      merchantPage.classification = MerchantPage.CLASSIFICATION_TYPES.productListPage;

      await page.save();
      await merchantPage.save();
    }

    const newPages = georgeCigar.catalogPages.filter(page => page.slug != 'cigars' && page.slug != 'vapes' && page.slug != 'glass' && page.slug != 'cbd')
    for (const page of newPages) {
      await CatalogPage.create({ ...page, catalogId: catalog.id }, {
        include: {
          model: MerchantPage,
          as: 'merchantPage'
        }
      });
    }

    const reviews = await Review.findAll();
    reviews.forEach(async review => {
      review.catalogId = catalog.id;
      await review.save();
    });

    const messages = await Message.findAll();
    messages.forEach(async message => {
      message.catalogId = catalog.id;
      await message.save();
    });

    const user = await User.findOne({ where: { id: 2 } });
    const role = await Role.findOne({ where: { code: Role.ROLE_CODES.merchant } });
    await user.addRole(role);
    await user.addCatalog(catalog);
  },

  down: () => {
    return Promise.resolve();
  }
};
