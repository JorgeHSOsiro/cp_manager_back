"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"cellphones",
			[
				{
					data: JSON.stringify({
						name: "Xiaomi Redmi 9",
						brand: "Xiaomi",
						model: "Redmi 9",
						price: 10000,
						color: "red",
					}),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					data: JSON.stringify({
						name: "Xiaomi Redmi 9",
						details: {
							brand: "Xiaomi",
							model: "Redmi 9",
							color: "red",
						},
						price: 10000,
					}),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					data: JSON.stringify([
						{
							name: "Xiaomi Redmi 9",
							brand: "Xiaomi",
							model: "Redmi 9",
							data: [
								{
									price: 10000,
									color: "red",
								},
								{
									price: 10000,
									color: "blue",
								},
							],
						},
						{
							name: "Iphone 14 Pro",
							brand: "Iphone",
							model: "14 Pro",
							data: [
								{
									price: 30000,
									color: "silver",
								},
								{
									price: 30100,
									color: "gold",
								},
							],
						},
					]),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("cellphones", null, {});
	},
};
