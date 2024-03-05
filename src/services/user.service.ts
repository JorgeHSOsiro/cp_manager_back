import { BadRequestError } from "restify-errors";
import { validateProperties, validateValues } from "../helper/validation";
import { UserInterface } from "../interfaces/user.interface";

import UserModel from "../database/models/user.model";

export default class UserService {
	private model = UserModel;

	private validateUser = (user: UserInterface) => {
		const properties = ["name", "email", "password"];
		let [valid, property] = validateProperties(user, properties);
		if (!valid) {
			return `O campo ${property} é obrigatório.`;
		}

		[valid, property] = validateValues(user);

		if (!valid) {
			return `O campo ${property} não pode ser nulo ou vazio.`;
		}
	};

	public getUserById = async (id: number): Promise<UserInterface> => {
		const user = await this.model.findOne({ where: { id } });
		if (!user) {
			throw new BadRequestError("User not registered");
		}
		return user;
	};

	public getUserByEmail = async (
		email: string
	): Promise<UserInterface | null> => {
		const user = await UserModel.findOne({ where: { email } });

		return user;
	};

	public createUser = async (user: UserInterface): Promise<UserInterface> => {
		const isValidUser = this.validateUser(user);
		if (typeof isValidUser === "string") {
			throw new BadRequestError(isValidUser);
		}

		const emailExists = await this.getUserByEmail(user.email);
		if (emailExists) {
			throw new BadRequestError("Email already exists");
		}
		const newUser = await this.model.create(user);
		return newUser;
	};
}
