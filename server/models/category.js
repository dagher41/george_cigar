'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    tableName: 'categories'
});
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.ProductCategory);
    Category.belongsToMany(models.Product, { through: models.ProductCategory });
  };
  return Category;
};