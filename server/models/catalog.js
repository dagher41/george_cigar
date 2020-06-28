'use strict';
module.exports = (sequelize, DataTypes) => {
  const Catalog = sequelize.define('Catalog', {
    name: DataTypes.STRING,
    hostname: DataTypes.STRING,
    status: DataTypes.INTEGER,
    address: {
      type: DataTypes.JSONB
    },
    social: {
      type: DataTypes.JSONB
    },
    contact: {
      type: DataTypes.JSONB
    },
    businessHours: {
      type: DataTypes.JSONB,
      field: 'business_hours'
    },
    logoSrc: {
      type: DataTypes.STRING,
      field: 'logo_src'
    },
    faviconPrefix: {
      type: DataTypes.STRING,
      field: 'favicon_prefix'
    }
  }, {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    tableName: 'catalogs'
  });
  Catalog.associate = function (models) {
    Catalog.hasMany(models.UserCatalog, { as: 'userCatalogs', foreignKey: 'catalog_id' });
    Catalog.hasMany(models.CatalogPage, { as: 'catalogPages' });
    Catalog.belongsToMany(models.User, { through: models.UserCatalog, as: 'owners' });
  };

  Catalog.STATUS_CODES = { active: 1, inactive: 0 };
  return Catalog;
};