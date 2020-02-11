import { Catalog } from '../../../models';

export default async (req, _, next) => {
    const hostname = req.hostname.replace('wwww.', '');
    const { debugHostname } = req.query;
    if (debugHostname === 'true') {
        console.log('Hostname:  ', hostname);
    }
    const catalog = await Catalog.findOne({
        where: { hostname },
        attributes: ['id', 'name', 'address', 'social', 'contact', 'businessHours', 'logoSrc', 'faviconPrefix']
    });
    if (catalog) {
        req.catalog = catalog;
        return next();
    }

    const error = new Error(`Invalid hostname provided '${hostname}'`);
    next(error);
}