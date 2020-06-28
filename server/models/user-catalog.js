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
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    tableName: 'user_catalogs'
  });
  UserCatalog.associate = function (models) {
    UserCatalog.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    UserCatalog.belongsTo(models.Catalog, { as: 'catalog', foreignKey: 'catalog_id' });
  };
  return UserCatalog;
};