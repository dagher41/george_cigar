import { Catalog } from '../../../models';

export default async (req, res, next) => {
    const hostname = req.hostname.replace('www.', '');
    const { debugHostname } = req.query;
    if (debugHostname === 'true') {
        console.log('Hostname:  ', hostname);
    }
    const catalog = await Catalog.findOne({
        where: { hostname },
        attributes: ['id', 'name', 'address', 'social', 'contact', 'logoSrc', 'faviconPrefix']
    });
    if (catalog) {
        req.catalog = catalog;
        res.locals.catalog = catalog;
        return next();
    }

    const error = new Error(`Invalid hostname provided '${hostname}'`);
    next(error);
}