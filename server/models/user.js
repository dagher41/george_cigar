'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name'
    },
    email: DataTypes.STRING,
    password: DataTypes.TEXT
  }, {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    tableName: 'users'
  });

  User.prototype.isAdmin = async function () {
    if (this._isAdmin == undefined) {
      const adminRoles = await this._hasUserRole(sequelize.models.Role.ROLE_CODES.administrator);
      this._isAdmin = Array.isArray(adminRoles) && adminRoles.length === 1;
    }
    return this._isAdmin;
  }

  User.prototype.isMerchant = async function () {
    if (this._isMerchant == undefined) {
      const merchantRole = await this._hasUserRole(sequelize.models.Role.ROLE_CODES.merchant);
      this._isMerchant = Array.isArray(merchantRole) && merchantRole.length === 1;
    }
    return this._isMerchant;
  }

  User.prototype._hasUserRole = async function (code) {
    if (this._userRoles == undefined) {
      this._userRoles = await this.getRoles({
        attributes: ['code'],
        through: {
          attributes: ['id']
        },
        joinTableAttributes: ['id'],
        limit: 1
      });
    }
    return this._userRoles.filter(role => role.code == code);
  }

  User.prototype.fullName = function () {
    return `${this.lastName}, ${this.firstName}`
  }

  User.associate = function (models) {
    User.hasMany(models.UserRole, { onDelete: 'CASCADE' });
    User.belongsToMany(models.Role, { through: models.UserRole, otherKey: 'role_code' });

    User.hasMany(models.UserCatalog);
    User.belongsToMany(models.Catalog, { through: models.UserCatalog });
  };
  return User;
};