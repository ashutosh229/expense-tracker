"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Expenses", [
      {
        description: "Groceries",
        amount: 1200.5,
        type: "Food",
        included_in_total: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Electricity Bill",
        amount: 2500,
        type: "Utilities",
        included_in_total: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Incomes", [
      {
        description: "Freelance Work",
        amount: 5000,
        type: "Salary",
        included_in_total: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Dues", [
      {
        name: "John Doe",
        amount: 1000,
        description: "Borrowed for rent",
        type: "Lent",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Expenses", null, {});
    await queryInterface.bulkDelete("Incomes", null, {});
    await queryInterface.bulkDelete("Dues", null, {});
  },
};
