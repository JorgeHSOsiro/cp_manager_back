"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) =>
		queryInterface.bulkInsert(
			"users",
			[
				{
					name: "Foo",
					email: "foo@test.com",
					password: "teste1234",
					createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
					updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
				{
					name: "soo",
					email: "soo@test.com",
					password: "senha1234",
					createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
					updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
			],
			{}
		),

	down: async (queryInterface) => queryInterface.bulkDelete("users", null, {}),
};
