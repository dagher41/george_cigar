'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    roleCode: {
      type: DataTypes.INTEGER,
      field: 'role_code'
    }
  }, {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    tableName: 'user_roles'
  });
  UserRole.associate = function (models) {
    UserRole.belongsTo(models.User);
    UserRole.belongsTo(models.Role, { foreignKey: 'role_code' });
  };
  return UserRole;
};