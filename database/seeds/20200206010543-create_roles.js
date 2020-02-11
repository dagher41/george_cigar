import { Role } from '../../server/models';

module.exports = {
  up: () => {
    return Role.bulkCreate([{
      name: 'merchant',
      code: Role.ROLE_CODES.merchant
    }, {
      name: 'administrator',
      code: Role.ROLE_CODES.administrator
    }])
  },

  down: () => {
    return Role.destroy({ where: { code: [Role.ROLE_CODES.merchant, Role.ROLE_CODES.administrator] } });
  }
};
