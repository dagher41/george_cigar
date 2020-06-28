'use strict';
module.exports = (sequelize, DataTypes) => {
  const PersistentSession = sequelize.define('PersistentSession', {
    sid: {
      type: DataTypes.STRING(36),
      primaryKey: true,
    },
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
    createdAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    updatedAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
    }
  }, {
    timestamps: true,
    freezeTableName: true,
    tableName: 'persistent_sessions'
  });
  PersistentSession.associate = function (models) {
    // associations can be defined here
  };
  return PersistentSession;
};