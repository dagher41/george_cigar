
module.exports = (sequelize, DataTypes) => {
  const BusinessHour = sequelize.define('BusinessHour', {
    catalogId: {
      type: DataTypes.INTEGER,
      field: 'catalog_id'
    },
    dayOfWeek: {
      type: DataTypes.INTEGER,
      field: 'day_of_week'
    },
    openTime: {
      type: DataTypes.STRING,
      field: 'open_time'
    },
    closeTime: {
      type: DataTypes.STRING,
      field: 'close_time'
    }
  }, {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    tableName: 'business_hours'
  });
  BusinessHour.associate = function (models) {
    BusinessHour.belongsTo(models.Catalog, { as: 'catalog' });
  };

  BusinessHour.getDayMapping = () => {
    return {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    }
  }
  return BusinessHour;
};