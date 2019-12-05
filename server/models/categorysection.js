'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategorySection = sequelize.define('CategorySection', {
    title: DataTypes.STRING,
    sub_heading: DataTypes.STRING,
    body: DataTypes.STRING,
    category_id: DataTypes.INTEGER
  }, {});
  CategorySection.associate = function(models) {
    // associations can be defined here
  };
  return CategorySection;
};