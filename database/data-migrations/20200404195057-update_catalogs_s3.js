'use strict';

import { Catalog, CatalogPage } from '../../server/models';

module.exports = {
  up: async () => {
    let catalog = await Catalog.findOne({ where: { hostname: 'georgecigar.com' } });
    catalog.faviconPrefix = 'georgecigar';
    catalog.logoSrc = 'https://gnsolutionscatalogs.s3-us-west-1.amazonaws.com/georgecigar/web/georgecigar_logo_01.png';

    let social = JSON.parse(catalog.social);
    delete social.facebook.imageSource;
    delete social.instagram.imageSource;
    catalog.social = JSON.stringify(social);

    await catalog.save();

    let page = await CatalogPage.findOne({ where: { name: 'Home', catalogId: catalog.id } });
    let clientMetadata = JSON.parse(page.clientMetadata);
    clientMetadata.componentData.content = clientMetadata.componentData.content.replace('/images/georgecigar-9.jpg', 'https://gnsolutionscatalogs.s3-us-west-1.amazonaws.com/georgecigar/web/georgecigar-9.jpg');
    clientMetadata.componentData.content = clientMetadata.componentData.content.replace('/images/georgecigar-114.jpg', 'https://gnsolutionscatalogs.s3-us-west-1.amazonaws.com/georgecigar/web/georgecigar-114.jpg');
    page.clientMetadata = JSON.stringify(clientMetadata);
    await page.save();

    catalog = await Catalog.findOne({ where: { hostname: 'mikesglassandgifts.com' } });
    catalog.faviconPrefix = 'mikesglassandgifts';
    catalog.logoSrc = 'https://gnsolutionscatalogs.s3-us-west-1.amazonaws.com/mikesglassandgifts/web/mikes_glass_and_gifts_logo_01.png'

    social = JSON.parse(catalog.social);
    delete social.instagram.imageSource;
    catalog.social = JSON.stringify(social);

    await catalog.save();

    page = await CatalogPage.findOne({ where: { name: 'Home', catalogId: catalog.id } });
    clientMetadata = JSON.parse(page.clientMetadata);
    clientMetadata.componentData.content = clientMetadata.componentData.content.replace('/images/mikes_giftbox.jpg', 'https://gnsolutionscatalogs.s3-us-west-1.amazonaws.com/mikesglassandgifts/web/mikes_giftbox.jpg');
    clientMetadata.componentData.content = clientMetadata.componentData.content.replace('/images/rsz_1mikes_glass_and_gifts_cart_01.jpg', 'https://gnsolutionscatalogs.s3-us-west-1.amazonaws.com/mikesglassandgifts/web/rsz_1mikes_glass_and_gifts_cart_01.jpg');
    clientMetadata.componentData.content = clientMetadata.componentData.content.replace('/images/mike_FullSizeRender.jpg', 'https://gnsolutionscatalogs.s3-us-west-1.amazonaws.com/mikesglassandgifts/web/mike_FullSizeRender.jpg');
    page.clientMetadata = JSON.stringify(clientMetadata);
    await page.save();
  },

  down: () => {

  }
};
