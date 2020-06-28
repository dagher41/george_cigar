import bcrypt from 'bcrypt';

import AdminControllerBase from '../../lib/admin-view-controller'
import { User, Role, sequelize } from '../../../models';
const saltRounds = 10;

export default class UsersController extends AdminControllerBase {
  getResourceName() {
    return 'user'
  }

  async indexPage(req, res) {
    const users = await User.findAll({
      order: [['id', 'DESC']],
      include: {
        model: Role,
        where: { code: Role.ROLE_CODES.merchant }
      }
    });
    const page = await this._getMerchantPage(req.catalog.id, 'merchants');
    super.indexPage({ res, pageParams: { users }, currentPage: page });
  }

  async newPage(req, res) {
    const user = new User()
    const page = await this._getMerchantPage(req.catalog.id, 'merchants');
    super.newPage({ res, pageParams: { user }, currentPage: page });
  }

  async createAction(req, res) {
    const { first_name: firstName, last_name: lastName, email, password, passwordConfirmation } = req.body;
    const existingUser = await User.findOne({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('email')),
        sequelize.fn('lower', email.trim())
      )
    });

    if (existingUser) {
      req.flash('info', 'Email Address Already Exists');
      // return res.redirect('/admin/merchants/new');
    }
    if (password.length < 8) {
      req.flash('info', 'Password must be at least 8 characters');
      // return res.redirect('/admin/merchants/new');
    }
    if (password != passwordConfirmation) {
      req.flash('info', 'Password does not match password confirmation');
      // return res.redirect('/merchant/signup');
    }

    bcrypt.hash(password, saltRounds, async (err, password) => {
      if (err) {
        return reject(err)
      }

      const user = await User.create({ email, password, firstName, lastName })
      const role = await Role.findOne({ where: { code: Role.ROLE_CODES.merchant } });
      await user.addRole(role);
      const currentPage = await this._getMerchantPage(req.catalog.id, 'merchants');
      super.createAction({ res, currentPage });
    });
  }

  async editPage(req, res) {
    const user = await User.findOne({ where: { id: req.params.id } });
    const page = await this._getMerchantPage(req.catalog.id, 'merchants');
    return super.editPage({ res, pageParams: { user }, currentPage: page });
  }

  async updateAction(req, res) {
    const { first_name: firstName, last_name: lastName, email } = req.body;
    const user = await User.findOne({ where: { id: req.params.id } });
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    await user.save();
    const page = await this._getMerchantPage(req.catalog.id, 'merchants');
    return super.updateAction({ res, currentPage: page });
  }
}