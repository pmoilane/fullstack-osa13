const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      defaultValue: new Date().getFullYear(),
      allowNull: false,
      validate: {
        min: {
          args: 1991,
          msg: 'Minimum year is 1991',
        },
        max: {
          args: Number(new Date().getFullYear()),
          msg: 'Year cannot be higher than current year',
        },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year');
  },
};
