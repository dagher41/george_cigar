import { Role } from '../../../models';

export default async (req, _, next) => {
    if (!req.catalog) {
        return next(new Error('Undefined Store'));
    } else if (!req.user) {
        return next(new Error('User Login Requried'));
    }

    if (await req.user.isAdmin()) {
        return next();
    }

    const merchantCatalogs = await req.user.getUserCatalogs({
        attributes: ['id'],
        where: { catalogId: req.catalog.id, roleCode: Role.ROLE_CODES.merchant },
        limit: 1,
    });

    if (!Array.isArray(merchantCatalogs) || merchantCatalogs.length == 0) {
        return next(new Error('Unauthorized Access to Store'))
    }

    next();
};