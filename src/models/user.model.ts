import { Pool } from "pg";
import { UserInterface } from "../interfaces/user.interface";

export default class UserModel {
	private pool: Pool;

	constructor(pool: Pool) {
		this.pool = pool;
	}

	public create = async (user: UserInterface) => {
		const { name, email, password } = user;
		const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
		const values = [name, email, password];
		const result = await this.pool.query(query, values);
		return result.rows[0];
	};

	public findByEmail = async (email: string) => {
		const query = `SELECT * FROM users WHERE email = $1`;
		const values = [email];
		const result = await this.pool.query(query, values);
		return result.rows[0];
	};

	public findById = async (id: number) => {
		const query = `SELECT * FROM users WHERE id = $1`;
		const values = [id];
		const result = await this.pool.query(query, values);
		return result.rows[0];
	};

	public delete = async (id: number) => {
		const query = `DELETE FROM users WHERE id = $1`;
		const values = [id];
		const result = await this.pool.query(query, values);
		return result.rows[0];
	};
}
