import { BadRequestError } from "restify-errors";
import { validateProperties, validateValues } from "../helper/validation";
import { UserInterface } from "../interfaces/user.interface";
import connection from "../models/connection";
import UserModel from "../models/user.model";

export default class UserService {
	private model: UserModel;

	constructor() {
		this.model = new UserModel(connection);
	}

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

	private getUserById = async (id: number): Promise<UserInterface> => {
		return this.model.findById(id);
	};

	public getUserByEmail = async (email: string): Promise<UserInterface> => {
		return this.model.findByEmail(email);
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

		return this.model.create(user);
	};

	public deleteUser = async (id: number): Promise<UserInterface> => {
		const userFound = await this.getUserById(id);
		if (!userFound) {
			throw new BadRequestError("User not registered");
		}

		return this.model.delete(id);
	};
}
