import { Model } from "sequelize";
import { UserInterface } from "../../interfaces/user.interface";
import db from ".";
import sequelize from "sequelize";

class UserModel extends Model implements UserInterface {
	public id!: number;
	public name!: string;
	public email!: string;
	public password!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
}

UserModel.init(
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: sequelize.INTEGER,
		},
		name: {
			allowNull: false,
			type: sequelize.STRING,
		},
		email: {
			allowNull: false,
			type: sequelize.STRING,
		},
		password: {
			allowNull: false,
			type: sequelize.STRING,
		},
		createdAt: {
			allowNull: false,
			type: sequelize.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: sequelize.DATE,
		},
	},
	{ sequelize: db, tableName: "users" }
);

export default UserModel;
