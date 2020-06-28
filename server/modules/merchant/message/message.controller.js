import AdminViewController from '../../lib/admin-view-controller';
import { Message } from '../../../models';

export default class MessageController extends AdminViewController {
    getResourceName() {
        return 'message'
    }

    async indexPage(req, res) {
        const messages = await Message.findAll({
            where: { catalogId: req.catalog.id },
            order: [['created_at', 'DESC']]
        });
        const page = await this._getMerchantPage(req.catalog.id, 'messages');
        return super.indexPage({ res, pageParams: { messages }, currentPage: page });
    }
}