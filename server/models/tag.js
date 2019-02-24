
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      tableName: 'tags'
    });
  Tag.associate = function (models) {
    // associations can be defined here
    Tag.hasMany(models.ProductTag);
    Tag.belongsToMany(models.Product, { through: models.ProductTag });
  };
  return Tag;
};