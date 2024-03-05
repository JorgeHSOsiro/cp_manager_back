import { JwtPayload } from "jsonwebtoken";

export interface UserInterface {
	id: number;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}
