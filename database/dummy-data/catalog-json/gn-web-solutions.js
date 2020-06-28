import {
  Catalog,
  MerchantPage,
} from '../../../server/models';

export default {
  catalog: {
    name: 'GN Solutions',
    hostname: 'gnwebsolutions.com',
    status: Catalog.STATUS_CODES.active,
    address: JSON.stringify({
      lineOne: '804 South Anaheim Blvd',
      lineTwo: 'Ste B',
      city: 'Anaheim',
      state: 'CA',
      zip: '92805',
      mapsUrl: 'https://goo.gl/maps/26yv96nFMxq'
    }),
    businessHours: JSON.stringify([
      'Monday-Friday 9:00am-5:00pm'
    ]),
    contact: JSON.stringify({}),
    social: JSON.stringify({}),
    logoSrc: 'https://gnsolutionscatalogs.s3-us-west-1.amazonaws.com/georgecigar/web/georgecigar_logo_01.webp',
    faviconPrefix: 'gnwebsolutions'
  },
  catalogPages: [{
    name: 'Home',
    position: 10,
    templateId: 'GenericHeroPage',
    clientMetadata: JSON.stringify({}),
    publicVisible: false,
  }, {
    name: 'Merchants',
    slug: 'merchants',
    position: 20,
    templateId: 'GenericHeroPage',
    clientMetadata: JSON.stringify({}),
    merchantPage: {
      name: 'Merchants',
      slug: 'merchants',
      position: 10,
      classification: MerchantPage.CLASSIFICATION_TYPES.merchantsPage,
    },
    publicVisible: false
  }, {
    name: 'Catalogs',
    slug: 'catalogs',
    position: 30,
    templateId: 'GenericHeroPage',
    clientMetadata: JSON.stringify({}),
    merchantPage: {
      name: 'Catalogs',
      slug: 'catalogs',
      position: 20,
      classification: MerchantPage.CLASSIFICATION_TYPES.catalogsPage,
    },
    publicVisible: false
  }]
}