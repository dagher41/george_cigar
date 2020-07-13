import Stripe from 'stripe';
import AdminController from '../../lib/admin-view-controller';
import {
  PaymentMethod,
  PaymentProfile,
  User
} from '../../../models';

const stripe = new Stripe(process.env.STRIPE_SECRET);

export default class PaymentMethodsController extends AdminController {
  getResourceName() {
    return 'payment-method'
  }

  async indexPage({ catalog, params: { userId } }, res) {
    let paymentProfile = await PaymentProfile.findOne({
      attributes: ['externalId', 'createdAt'],
      where: { userId },
      include: {
        model: PaymentMethod,
        as: 'paymentMethods',
        attributes: ['externalId', 'createdAt', 'brand', 'lastFour', 'expMonth', 'expYear']
      }
    });
    const currentPage = await this._getMerchantPage(catalog.id, 'merchants');
    return super.indexPage({ res, pageParams: { paymentProfile, userId }, currentPage })
  }

  async newPage({ catalog, params: { userId } }, res) {
    const paymentProfile = new PaymentProfile({ userId });
    const currentPage = await this._getMerchantPage(catalog.id, 'merchants');
    return super.newPage({ res, pageParams: { paymentProfile, publicKey: process.env.STRIPE_PUBLIC_KEY }, currentPage });
  }

  async createAction({ params: { userId }, body: { stripeToken } }, res) {
    const user = await User.findByPk(userId);
    const exitingProfile = await PaymentProfile.findOne({ where: { userId }, attributes: ['id', 'externalId'] });
    async function retreiveCustomer(profile) {
      return new Promise((resolve) => {
        stripe.customers.retrieve(profile.externalId, (err, customer) => resolve({ err, customer }));
      })
    }

    async function createCustomer(user) {
      return new Promise((resolve) => {
        stripe.customers.create({ name: user.fullName(), email: user.email }, (err, customer) => resolve({ err, customer }))
      })
    }

    const { err, customer } = exitingProfile ? await retreiveCustomer(exitingProfile) : await createCustomer(user);
    const paymentProfile = exitingProfile || await PaymentProfile.create({ userId, externalId: customer.id, provider: 'stripe' });
    stripe.customers.createSource(
      customer.id, { source: stripeToken },
      async (err, card) => {
        if (err) {
          return;
        }
        const { brand, id: externalId, exp_month: expMonth, exp_year: expYear, last4: lastFour } = card;
        await PaymentMethod.create({ paymentProfileId: paymentProfile.id, externalId, brand, expMonth, expYear, lastFour });
        return super.createAction({ res, redirectPath: `/admin/merchants/${userId}/payment_methods` });
      }
    );
  }
}