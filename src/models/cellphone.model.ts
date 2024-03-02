import { Pool } from "pg";
import { CellphoneInterface } from "../interfaces/cellphone.interface";
import { error } from "console";

export default class CellphoneModel {
	private pool: Pool;

	constructor(pool: Pool) {
		this.pool = pool;
	}

	async create(cellphone: CellphoneInterface) {
		const { brand, model, price, color, name } = cellphone;
		const query = `
      INSERT INTO cellphones ( name, brand, model, price, color)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
		const values = [name, brand, model, price, color];
		const result = await this.pool.query(query, values);
		return result.rows[0];
	}

	async findAll(): Promise<CellphoneInterface[]> {
		const query = "SELECT * FROM cellphones ORDER BY id ASC";
		const result = await this.pool.query(query);
		return result.rows;
	}
	async findById(id: number): Promise<CellphoneInterface> {
		const query = "SELECT * FROM cellphones WHERE id = $1";
		const values = [id];
		const result = await this.pool.query(query, values);
		return result.rows[0];
	}

	async update(id: number, cellphone: CellphoneInterface) {
		const { brand, model, price, color, name } = cellphone;
		const query = `
      UPDATE cellphones
      SET name = $1, brand = $2, model = $3, price = $4, color = $5
      WHERE id = $6
      RETURNING *
    `;
		const values = [name, brand, model, price, color, id];
		const result = await this.pool.query(query, values);
		return result.rows[0];
	}

	async delete(id: number) {
		const query = "DELETE FROM cellphones WHERE id = $1";
		const values = [id];
		await this.pool.query(query, values);
	}
}
