"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        login: "user",
        email: "9@9",
        password: await bcrypt.hash("1", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
      {};
  },

  async down(queryInterface, Sequelize) {

      await queryInterface.bulkDelete('People', null, {});

  },
};
