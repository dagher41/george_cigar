'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategorySection = sequelize.define('CategorySection', {
    title: DataTypes.TEXT,
    subHeading: {
      type: DataTypes.TEXT,
      field: 'sub_heading'
    },
    body: DataTypes.TEXT,
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id'
    },
    position: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    tableName: 'category_sections'
});
  CategorySection.associate = function(models) {
    CategorySection.belongsTo(models.Category);

    CategorySection.hasMany(models.CategorySectionProduct);
    CategorySection.belongsToMany(models.Product, { through: models.CategorySectionProduct, as: 'products' })
  };
  return CategorySection;
};

