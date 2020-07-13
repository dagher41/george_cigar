import PaymentMethodsController from './payment-method.controller';

const { router } = PaymentMethodsController.buildResource('payment_methods', [], {
  scopedRoutes: {
    scope: {
      parentResource: 'merchants',
      parentIdentifier: 'userId',
      routes: ['index', 'new', 'create']
    }
  }
});

export default router;