import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import UserService from "../services/user.service";
import statusCodes from "../../statusCodes";

const secret: Secret = <Secret>process.env.JWT_SECRET;

const extractToken = (bearerToken: string) => {
	return bearerToken.split(" ")[1];
};

module.exports = async (req: Request, res: Response, next: NextFunction) => {
	const userService = new UserService();
	const bearerToken = req.header("Authorization");
	if (!bearerToken) {
		return res.status(statusCodes.UNAUTHORIZED).send("Unauthorized");
	}

	const token = extractToken(bearerToken);

	try {
		const decoded = jwt.verify(token, secret);

		const user = await userService.getUserById((<any>decoded).data.id);

		if (!user) {
			return res.status(statusCodes.UNAUTHORIZED).send("Unauthorized");
		}
		req.user = user;
		next();
	} catch (err) {
		return res.status(statusCodes.UNAUTHORIZED).send("Unauthorized");
	}
};
