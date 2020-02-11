import MerchantController from '../merchant-controller';
import { Message } from '../../../models';

export default class MessageController extends MerchantController {
    getResourceName() {
        return 'message'
    }

    async indexPage(req) {
        const messages = await Message.findAll({
            where: { catalogId: req.catalog.id },
            order: [['created_at', 'DESC']]
        });
        const page = await this._getMerchantPage(req.catalog.id, 'messages');
        return { pageParams: { messages }, currentPage: page };
    }
}