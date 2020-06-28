
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('persistent_sessions', {
      sid: {
        type: Sequelize.STRING(36),
        primaryKey: true,
      },
      expires: Sequelize.DATE,
      data: Sequelize.TEXT,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('persistent_sessions');
  }
};
