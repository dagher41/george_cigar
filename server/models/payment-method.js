'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentMethod = sequelize.define('PaymentMethod', {
    payment_profile_id: DataTypes.INTEGER,
    externalId: DataTypes.STRING,
    brand: {
      type: DataTypes.STRING,
    },
    expMonth: {
      type: DataTypes.INTEGER,
      field: 'exp_month'
    },
    expYear: {
      type: DataTypes.INTEGER,
      field: 'exp_year'
    },
    lastFour: {
      type: DataTypes.STRING,
      field: 'last_four'
    },
  }, {
    underscored: true,
    tableName: 'payment_methods'
  });
  PaymentMethod.associate = function (models) {
    PaymentMethod.belongsTo(models.PaymentProfile, { as: 'paymentProfile' })
  };
  return PaymentMethod;
};