import { Model } from "sequelize";
import { CellphoneInterface } from "../../interfaces/cellphone.interface";

import db from ".";
import sequelize from "sequelize";

class CellphoneModel extends Model implements CellphoneInterface {
	public id!: number;
	public data!: JSON;
	public createdAt!: Date;
	public updatedAt!: Date;
}

CellphoneModel.init(
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: sequelize.INTEGER,
		},
		data: {
			allowNull: false,
			type: sequelize.JSONB,
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
	{ sequelize: db, tableName: "cellphones" }
);

export default CellphoneModel;
