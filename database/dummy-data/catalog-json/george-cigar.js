import {
  Catalog,
  MerchantPage,
} from '../../../server/models';

export default {
  user: {
    email: "foo@bar.com"
  },
  catalog: {
    name: 'George Cigar & Smoke',
    hostname: 'georgecigar.com',
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
      'Sunday-Wednesday 9:00am-10:00pm',
      'Thursday-Saturday 9:00am-11:00pm'
    ]),
    contact: JSON.stringify({
      telephone: {
        value: '714-780-1195',
        label: '&#40;714&#41;&#32;780&#45;1195'
      },
      email: {
        value: 'info@georgecigar.com',
        label: 'info@georgecigar.com'
      },
      googleMaps: {
        src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.4495364638265!2d-117.91255974943984!3d33.82651583694459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd6322b0675fb%3A0x1b88e11764d183a4!2sGeorge+Cigar+(Smoke+and+Vape)!5e0!3m2!1sen!2sus!4v1550940284713',
      },
    }),
    social: JSON.stringify({
      facebook: {
        footerVisible: true,
        position: 10,
        href: 'https://www.facebook.com/George-Cigar-Smoke-102131994594656/',
        title: 'Facebook Link'
      },
      instagram: {
        footerVisible: true,
        position: 20,
        href: 'https://www.instagram.com/george_cigar_n_smoke/',
        title: 'Instagram Link',
      }
    }),
    logoSrc: 'https://gnsolutionscatalogs.s3-us-west-1.amazonaws.com/georgecigar/web/georgecigar_logo_01.png',
    faviconPrefix: 'georgecigar'
  },
  catalogPages: [{
    name: 'Home',
    position: 10,
    templateId: 'GenericHeroPage',
    clientMetadata: JSON.stringify({
      componentData: {
        heroClassName: 'bg-cigars-2',
        heroContent: '<h1 className="text-center text-white">Anaheim&apos;s Home for Premier Cigars, Vapes, Glass and CBD</h1>',
        content: '<div className="container-fluid p-4"><div className="row"><div className="col-md-6 col-sm-12 p-4"><h2>Location</h2><p>Conveniently located in the center of Anaheim, minutes away from Disneyland, The Packing House and Center Promenade</p></div><div className="col-md-6 col-sm-12 p-4"><BusinessHours businessHours={businessHours}/></div></div><div className="row"><div className="col-md-6 col-sm-12 px-4 google-map"><iframe className="shadow-1 p-4" src={googleMaps.src}height="100%" width="100%" frameBorder="0" style={{border: 0}}allowFullScreen></iframe></div><div className="col-md-6 col-sm-12 px-4"><img src="https://gnsolutionscatalogs.s3-us-west-1.amazonaws.com/georgecigar/web/georgecigar-114.jpg" width="100%" className="shadow-1 p-4"></img></div></div><div className="row my-4"><div className="row no-gutters"><div className="col-sm-12 p-4"><h2>About Us</h2></div></div><div className="row no-gutters"><div className="col-md-4 col-sm-12 px-4"><img src="https://gnsolutionscatalogs.s3-us-west-1.amazonaws.com/georgecigar/web/georgecigar-9.jpg" width="100%" className="shadow-1 p-4"></img></div><div className="col-md-8 mt-4 px-4"><h5>Nabil Dagher, Owner</h5><p> I&apos;ve worked in various customer service jobs ranging from bartending to jewelry sales and repairs. I built George Cigar &amp; Smoke with the goal of helping our customers find exactly what they are looking for and being completely satisifed with their experience.</p><h5>Our Shop</h5><p> George Cigar &amp; Smoke was founded in 2012. We started out with 5 boxes of cigars and a handful of various tobacco products. Since then we have grown to be Anaheim&apos;s most trusted cigar and smoke product retailer with a full humidor, a great selection of glass, vape and CBD products and a beautiful outdoor lounge to relax and enjoy your smoke.</p></div></div></div><div className="row"><div className="col-md-12 col-sm-12 p-4 mt-4"><h2>What Our Customers Are Saying</h2><p>We&apos;ve been proudly serving Anaheim since 2012. Here&apos;s what our customers are saying about us.</p><div className="row no-gutters"><QuoteList/></div></div></div></div>'
      },
    }),
    publicVisible: true,
  }, {
    name: 'Cigars',
    slug: 'cigars',
    position: 20,
    templateId: 'ProductListPage',
    clientMetadata: JSON.stringify({
      componentData: {
        heroClassName: 'bg-cigars-1',
        heroContent: '<h1 className="text-center text-white px-4 px-md-0">Cigars, Pipes and Tobacco Accessories</h1>',
        listClassName: 'bg-cigars-tiled'
      }
    }),
    merchantPage: {
      name: 'Cigars',
      slug: 'cigars',
      position: 10,
      classification: MerchantPage.CLASSIFICATION_TYPES.productListPage,
    },
    publicVisible: true
  }, {
    name: 'Vape',
    slug: 'vapes',
    position: 30,
    templateId: 'ProductListPage',
    clientMetadata: JSON.stringify({
      componentData: {
        heroClassName: 'bg-vapes-1',
        heroContent: '<h1 className="text-center text-white px-4 px-md-0">Vape Kits, E-Juices and Vape Accessories</h1>',
        listClassName: 'bg-vape-tiled'
      }
    }),
    merchantPage: {
      name: 'Vape',
      slug: 'vapes',
      position: 20,
      classification: MerchantPage.CLASSIFICATION_TYPES.productListPage
    },
    publicVisible: true
  }, {
    name: 'Glass',
    slug: 'glass',
    position: 40,
    templateId: 'ProductListPage',
    clientMetadata: JSON.stringify({
      componentData: {
        heroClassName: 'bg-glass-1',
        heroContent: '<h1 className="text-center text-white px-4 px-md-0">Glass Pipes and Glass Accessories</h1>',
        listClassName: 'bg-glass-tiled'
      }
    }),
    merchantPage: {
      name: 'Glass',
      slug: 'glass',
      position: 30,
      classification: MerchantPage.CLASSIFICATION_TYPES.productListPage
    },
    publicVisible: true
  }, {
    name: 'CBD/Kratom',
    slug: 'cbd',
    position: 50,
    templateId: 'ProductListPage',
    clientMetadata: JSON.stringify({
      componentData: {
        heroClassName: 'bg-cbd-1',
        heroContent: '<h1 className="text-center text-white px-4 px-md-0">Our CBD/Kratom Selection</h1>',
        listClassName: 'bg-cbd-tiled'
      }
    }),
    merchantPage: {
      name: 'CBD/Kratom',
      slug: 'cbd',
      position: 40,
      classification: MerchantPage.CLASSIFICATION_TYPES.productListPage
    },
    publicVisible: true
  }, {
    name: 'Reviews',
    slug: 'reviews',
    position: 60,
    merchantPage: {
      name: 'Reviews',
      slug: 'reviews',
      position: 60,
      classification: MerchantPage.CLASSIFICATION_TYPES.reviewsPage,
    },
    publicVisible: false
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