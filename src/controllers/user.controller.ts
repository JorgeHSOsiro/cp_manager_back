import { Request, Response } from "express";
import statusCodes from "../statusCodes";
import UserService from "../services/user.service";

export default class UserController {
	private userService: UserService;

	constructor(userService = new UserService()) {
		this.userService = userService;
	}

	public registerUser = async (req: Request, res: Response) => {
		try {
			const user = req.body;
			const newUser = await this.userService.createUser(user);

			res.status(statusCodes.CREATED).json(newUser);
		} catch (error) {
			res.status(statusCodes.BAD_REQUEST).json({ error });
		}
	};

	public findUserByEmail = async (req: Request, res: Response) => {
		const { email } = req.body;

		const user = await this.userService.getUserByEmail(email);
		res.status(statusCodes.OK).json(user);
	};
}
