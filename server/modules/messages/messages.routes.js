import { Router } from 'express';
import db from '../../models';
const { Message } = db;

const publicRoutes = new Router();
publicRoutes
    .route('/messages')
    .post(async (req, res) => {
        const { email, message: body } = req.body;
        const message = await Message.create({ email, body });
        setTimeout(() => {
            res.json(message);
        }, 500);
    });

const adminRoutes = new Router();

adminRoutes
    .route('/messages')
    .get(async (_, res) => {
        const messages = await Message.findAll({ order: [['created_at', 'DESC']] })
        res.render('pages/messages/index', { currentPage: 'messages', messages });
    });

export default { api: publicRoutes, admin: adminRoutes };