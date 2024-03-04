import { JwtPayload } from "jsonwebtoken";

export interface UserInterface {
	id?: number;
	name: string;
	email: string;
	password: string;
}

export interface CustomRequest extends Request {
	token: string | JwtPayload;
}
