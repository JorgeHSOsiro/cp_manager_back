"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"users",
			[
				{
					name: "John Doe",
					email: "john@example.com",
					password: "XXXXXXXX",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Jane Doe",
					email: "jane@example.com",
					password: "XXXXXXXX",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface) => {
		await queryInterface.bulkDelete("users", null, {});
	},
};
