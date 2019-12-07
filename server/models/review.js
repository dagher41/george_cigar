'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    authorName: {
      type: DataTypes.STRING,
      field: 'author_name'
    },
    body: DataTypes.TEXT,
    source: DataTypes.STRING,
    position: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    tableName: 'reviews'
});
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};