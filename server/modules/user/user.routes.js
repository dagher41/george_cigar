import { Router } from 'express';
import { User, Role } from '../../models';

const adminRouter = new Router();
adminRouter
    .route('/merchants')
    .get(async (_, res) => {
        const users = await User.findAll({
            order: [['id', 'DESC']],
            include: {
                model: Role,
                where: { code: Role.ROLE_CODES.merchant }
            }
        });
        res.render('pages/user/admin_index', { currentPage: 'users', users })
    });

export default { api: null, owner: null, admin: adminRouter }