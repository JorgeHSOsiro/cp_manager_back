import { Request, Response } from "express";
import UserService from "../services/user.service";
import statusCodes from "../../statusCodes";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

export default class LoginController {
	private userService: UserService;

	constructor(userService = new UserService()) {
		this.userService = userService;
	}

	private isBodyValid = (email: string, password: string) => email && password;

	public login = async (req: Request, res: Response) => {
		const secret: Secret = process.env.JWT_SECRET || "secret";

		const { email, password } = req.body;

		if (!this.isBodyValid(email, password)) {
			return res
				.status(statusCodes.UNAUTHORIZED)
				.json({ message: "É necessário email e senha para fazer login" });
		}

		const user = await this.userService.getUserByEmail(email);

		if (!user || user.password !== password) {
			return res
				.status(statusCodes.UNAUTHORIZED)
				.json({ message: "Email ou senha incorretos" });
		}

		const jwtConfig: SignOptions = {
			expiresIn: "1d",
			algorithm: "HS256",
		};

		const token = jwt.sign({ data: user }, secret, jwtConfig);
		res.status(statusCodes.OK).json({ token });
	};
}
