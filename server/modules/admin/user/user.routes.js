import AdminMerchantController from './user.controller';

const { router } = AdminMerchantController.buildResource('merchants', ['index', 'new', 'create', 'edit', 'update'])

export default router