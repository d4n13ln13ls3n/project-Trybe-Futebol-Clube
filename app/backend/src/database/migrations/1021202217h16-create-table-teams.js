'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const TeamsTable = await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      teamName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'team_name',
      },
    });

    return TeamsTable;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teams');
  },
};