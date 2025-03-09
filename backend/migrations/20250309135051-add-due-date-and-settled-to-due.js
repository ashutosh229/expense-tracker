"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.changeColumn("Dues", "type", {
      type: DataTypes.ENUM("Borrowed", "Lent"),
      allowNull: false,
    });

    await queryInterface.addColumn("Dues", "due_date", {
      type: DataTypes.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn("Dues", "settled", {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("Dues", "type", {
      type: DataTypes.STRING,
      allowNull: false,
    });
    await queryInterface.removeColumn("Dues", "due_date");
    await queryInterface.removeColumn("Dues", "settled");
  },
};
