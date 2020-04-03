export default async (req, _, next) => {
    if (!req.catalog) {
        return next(new Error('Undefined Store'));
    } else if (!req.user) {
        return next(new Error('User Login Requried'));
    }

    if (await req.user.isAdmin()) {
        return next();
    }

    const userCatalogs = await req.user.getCatalogs({
        attributes: ['id'],
        where: { id: req.catalog.id },
        limit: 1
    });
    const isMerchant = await req.user.isMerchant();
    if (!Array.isArray(userCatalogs) || userCatalogs.length == 0 || !isMerchant) {
        return next(new Error('Unauthorized Access to Store'))
    }

    next();
};