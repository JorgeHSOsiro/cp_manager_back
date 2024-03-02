import connection from "../models/connection";
import CellphoneModel from "../models/cellphone.model";
import { CellphoneInterface } from "../interfaces/cellphone.interface";
import { validateProperties, validateValues } from "../helper/validation";
import { BadRequestError, NotFoundError } from "restify-errors";

export default class CellphoneService {
	private model: CellphoneModel;

	constructor() {
		this.model = new CellphoneModel(connection);
	}

	private validateCellphone(cellphone: CellphoneInterface) {
		const properties = ["name", "brand", "model", "price", "color"];
		let [valid, property] = validateProperties(cellphone, properties);
		if (!valid) {
			return `O campo ${property} é obrigatório.`;
		}

		[valid, property] = validateValues(cellphone);

		if (!valid) {
			return `O campo ${property} não pode ser nulo ou vazio.`;
		}
	}

	public async create(
		cellphone: CellphoneInterface
	): Promise<CellphoneInterface> {
		const isValidCellphone = this.validateCellphone(cellphone);
		if (typeof isValidCellphone === "string") {
			throw new BadRequestError(isValidCellphone);
		}
		return this.model.create(cellphone);
	}

	public async getAll(): Promise<CellphoneInterface[]> {
		return this.model.findAll();
	}

	public async getById(id: number): Promise<CellphoneInterface> {
		return this.model.findById(id);
	}

	public async update(id: number, cellphone: CellphoneInterface) {
		const isValidCellphone = this.validateCellphone(cellphone);
		if (typeof isValidCellphone === "string") {
			throw new BadRequestError(isValidCellphone);
		}
		const cellphoneFound = await this.model.findById(id);
		if (!cellphoneFound) {
			throw new NotFoundError("Cellphone not found");
		}

		return this.model.update(id, cellphone);
	}

	public async delete(id: number) {
		const cellphoneFound = await this.model.findById(id);
		if (!cellphoneFound) {
			throw new NotFoundError("Cellphone not found");
		}
		return this.model.delete(id);
	}
}
