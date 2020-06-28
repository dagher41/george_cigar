import MessageController from './message.controller';

const { router } = MessageController.buildResource('messages', ['index'])

export default router;