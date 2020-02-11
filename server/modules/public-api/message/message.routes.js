import { Router } from 'express';
import { Message } from '../../../models';

const router = new Router();
router
    .route('/messages')
    .post(async (req, res) => {
        const { email, message: body } = req.body;
        const catalogId = req.catalog.id;
        const message = await Message.create({ email, body, catalogId });
        setTimeout(() => {
            res.json(message);
        }, 500);
    });


export default router;