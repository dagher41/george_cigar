'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCatalog = sequelize.define('UserCatalog', {
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    catalogId: {
      type: DataTypes.INTEGER,
      field: 'catalog_id'
    },
    roleCode: {
      type: DataTypes.INTEGER,
      field: 'role_code'
    }
  }, {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    tableName: 'user_catalogs'
  });
  UserCatalog.associate = function (models) {
    UserCatalog.belongsTo(models.User);
    UserCatalog.belongsTo(models.Catalog);
  };
  return UserCatalog;
};