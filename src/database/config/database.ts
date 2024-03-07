import { Options } from "sequelize";

const dotenv = require("dotenv");
dotenv.config();

const config: Options = {
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DATABASE,
	host: process.env.POSTGRES_HOST,
	port: Number(process.env.DB_PORT) || 5432,
	dialect: "postgres",
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
};

export = config;
