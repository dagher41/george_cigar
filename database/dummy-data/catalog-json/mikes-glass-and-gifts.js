import {
  Catalog,
  MerchantPage,
} from '../../../server/models';

export default {
  user: {
    email: "foo@bar.com"
  },
  catalog: {
    name: 'Mike\'s Glass and Gifts',
    hostname: 'mikesglassandgifts.com',
    status: Catalog.STATUS_CODES.active,
    address: JSON.stringify({
      addressTitle: 'Pomona Swap Meet',
      lineOne: '1600 E Holt Ave',
      lineTwo: '',
      city: 'Pomona',
      state: 'CA',
      zip: '91767',
      mapsUrl: 'https://goo.gl/maps/85LsUT355QVRW7d56'
    }),
    businessHours: JSON.stringify([
      'Monday-Sunday: 10:00am-6:00pm',
      'Tuesday: Closed 😏'
    ]),
    contact: JSON.stringify({
      telephone: {
        value: '909-329-6754',
        label: '&#40;909&#41;&#32;329&#45;6754'
      },
      googleMaps: {
        src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.298450411081!2d-117.7210470850674!3d34.06186282467107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c332173ab43757%3A0xb07740c0e5b75c2f!2s1600%20E%20Holt%20Ave%2C%20Pomona%2C%20CA%2091767!5e0!3m2!1sen!2sus!4v1584205001644!5m2!1sen!2sus',
      },
    }),
    social: JSON.stringify({
      instagram: {
        footerVisible: true,
        position: 10,
        href: 'https://www.instagram.com/mikes_glassngifts/',
        title: 'Instagram Link'
      }
    }),
    logoSrc: 'https://gnsolutionscatalogs.s3-us-west-1.amazonaws.com/georgecigar/web/mikes_glass_and_gifts_logo_01.webp',
    faviconPrefix: 'mikesglassandgifts'
  },
  catalogPages: [{
    name: 'Home',
    position: 10,
    templateId: 'GenericHeroPage',
    clientMetadata: JSON.stringify({
      componentData: {
        heroClassName: 'bg-weed-1',
        heroContent: '<h1 className="text-center text-white">Pomona&apos;s Home for premier glass and glass accessories</h1>',
        content: ' <div className="container-fluid p-0"><div className="bg-weed-tiled h100 shadow-inset"></div><div className="row no-gutters"><div className="col-md-7 col-sm-12 p-4"><h2>Location</h2><p>Conveniently located next to the food cart inside the Pomona Swap Meet</p></div><div className="col-md-5 col-sm-12 p-4"><BusinessHours businessHours={businessHours}/></div></div><div className="row no-gutters pb-4"><div className="col-md-7 col-sm-12 px-4 google-map"><iframe className="shadow-1 p-4 no-border" src={googleMaps.src}height="100%" width="100%" frameBorder="0" allowFullScreen/></div><div className="col-md-5 col-sm-12 px-4 shadow-1 p-4 m-4 m-md-0"><img src="https://gnsolutionscatalogs.s3-us-west-1.amazonaws.com/georgecigar/web/rsz_1mikes_glass_and_gifts_cart_01.jpg" width="100%"/></div></div><div className="bg-weed-tiled h100 shadow-inset"/><div className="row no-gutters"><div className="col-12 col-md-5"><div className="m-4 p-4 shadow-1"><img src="https://gnsolutionscatalogs.s3-us-west-1.amazonaws.com/georgecigar/web/mike_FullSizeRender.jpg" width="100%"/></div></div><div className="col-12 col-md-7 my-5 px-5 d-flex align-items-center"><div className="text-center"><div><h2>Mike Dagher, Owner</h2><h5> Come check out Pomona&apos;s cleanest and largest selection of bongs, pipes and smoking accesories. </h5></div><h2 className="mt-5">About Us</h2><h5> Created in 2019, we at Mike&apos;s Glass and Gifts want to provide the best selection of glass products to all of Pomona. We will do everything we can to not only meet, but exceed all your smoking needs. </h5></div></div></div><div className="bg-weed-tiled h100 shadow-inset"></div><div className="row no-gutters"><div className="col-12 col-md-7 my-md-5 d-flex align-items-center order-12 order-md-1"><div className="text-center p-5"><h2>Cigar Box Gift Sets</h2><h5> Whether it&apos;s for a family member or that special someone, we can customize a beautiful all wood cigar box to make it just the way you want it. </h5><h5 className="p-3"> To make it special, you can mix and match different hand pieces, grinders, rolling papers, lighters and jars. </h5><h5 className="p-3"> Ask about our different pricing packages! </h5></div></div><div className="col-12 col-md-5 order-1 order-md-12"><div className="m-4 p-4 shadow-1"><img src="https://gnsolutionscatalogs.s3-us-west-1.amazonaws.com/georgecigar/web/mikes_giftbox.jpg" width="100%"/></div></div></div><div className="bg-weed-tiled h100 shadow-inset"></div></div>'
      },
    }),
    publicVisible: true,
  }, {
    name: 'Glass',
    slug: 'glass',
    position: 20,
    templateId: 'ProductListPage',
    clientMetadata: JSON.stringify({
      componentData: {
        heroClassName: 'bg-glass-person-1',
        heroContent: '<h1 className="text-center text-white px-4 px-md-0">The largest selection of glass in the Swapmeet</h1>',
        listClassName: 'bg-glass-tiled'
      }
    }),
    merchantPage: {
      name: 'Glass',
      slug: 'glass',
      position: 10,
      classification: MerchantPage.CLASSIFICATION_TYPES.productListPage
    },
    publicVisible: true
  }, {
    name: 'Accessories',
    slug: 'accessories',
    position: 30,
    templateId: 'ProductListPage',
    clientMetadata: JSON.stringify({
      componentData: {
        heroClassName: 'bg-weed-jar-1',
        heroContent: '<h1 className="text-center text-white px-4 px-md-0">We have all the accessories you\'ll need for your smoking pleasure</h1>',
        listClassName: 'bg-cbd-tiled'
      }
    }),
    merchantPage: {
      name: 'Accessories',
      slug: 'accessories',
      position: 20,
      classification: MerchantPage.CLASSIFICATION_TYPES.productListPage
    },
    publicVisible: true
  }, {
    name: 'Contact Us',
    slug: 'contact-us',
    position: 70,
    templateId: 'ContactUsPage',
    clientMetadata: JSON.stringify({
      componentData: {
      }
    }),
    merchantPage: {
      name: 'Messages',
      slug: 'messages',
      position: 70,
      classification: MerchantPage.CLASSIFICATION_TYPES.messagesPage,
    },
    publicVisible: true
  }]
}