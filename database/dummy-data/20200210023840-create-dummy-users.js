import { User, Role, UserRole } from '../../server/models';
import bcrypt from 'bcrypt';

const DUMMY_EMAIL = 'foo@bar.com'

module.exports = {
  up: async () => {
    const password = bcrypt.hashSync('Welcome1', 10);
    const user = await User.create({
      firstName: 'Tom',
      lastName: 'Ford',
      email: DUMMY_EMAIL,
      password: password
    });
    const merchant = await Role.findOne({ where: { code: Role.ROLE_CODES.merchant } });
    await user.addRole(merchant);
  },

  down: async () => {
    const user = await User.findOne({ where: { email: DUMMY_EMAIL } });
    await UserRole.destroy({ where: { userId: user.id } });
    await user.destroy();
  }
};
