import { Request, Response } from "express";
import statusCodes from "../../statusCodes";
import UserService from "../services/user.service";

export default class UserController {
	private userService: UserService;

	constructor(userService = new UserService()) {
		this.userService = userService;
	}

	public registerUser = async (req: Request, res: Response) => {
		const user = req.body;
		const newUser = await this.userService.createUser(user);
		res.status(statusCodes.CREATED).json(newUser);
	};

	public findUserByEmail = async (req: Request, res: Response) => {
		const { email } = req.body;
		const user = await this.userService.getUserByEmail(email);
		res.status(statusCodes.OK).json(user);
	};

	public deleteUser = async (req: Request, res: Response) => {
		const { id } = req.params;
		await this.userService.deleteUser(parseInt(id));
		res.status(statusCodes.OK).send(`Deleted user with ID: ${id}`);
	};
}
