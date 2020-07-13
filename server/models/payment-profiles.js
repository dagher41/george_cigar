'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentProfile = sequelize.define('PaymentProfile', {
    user_id: DataTypes.INTEGER,
    externalId: {
      type: DataTypes.STRING,
      field: 'external_id'
    },
    provider: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
      field: 'updated_at'
    }
  }, {
    underscored: true,
    tableName: 'payment_profiles'
  });
  PaymentProfile.associate = function (models) {
    PaymentProfile.belongsTo(models.User, { as: 'user' });
    PaymentProfile.hasMany(models.PaymentMethod, { as: 'paymentMethods' });
  };
  return PaymentProfile;
};