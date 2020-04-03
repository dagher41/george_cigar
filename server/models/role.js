'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    code: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    }
  }, {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    tableName: 'roles'
  });
  Role.associate = function (models) {
    Role.hasMany(models.UserRole, { onDelete: 'CASCADE', foreignKey: 'role_code' });
    Role.belongsToMany(models.User, { through: models.UserRole });
  };

  Role.ROLE_CODES = { merchant: 10, administrator: 20 };
  return Role;
};