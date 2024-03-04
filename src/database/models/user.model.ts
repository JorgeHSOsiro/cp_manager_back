export const UserModel = (sequelize: any, DataTypes: any) => {
	const User = sequelize.define("User", {
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
	});

	return User;
};
