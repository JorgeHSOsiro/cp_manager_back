import { CellphoneInterface } from "../interfaces/cellphone.interface";
import { BadRequestError, NotFoundError } from "restify-errors";
import CellphoneModel from "../database/models/cellphone.model";

export default class CellphoneService {
	private model = CellphoneModel;

	public async create(cellphone: any): Promise<CellphoneInterface> {
		if (!cellphone.data || Object.keys(cellphone.data).length === 0) {
			throw new BadRequestError("Please give more information of the product");
		}
		return this.model.create(cellphone);
	}

	public async getAll(): Promise<CellphoneInterface[]> {
		return this.model.findAll();
	}

	public async getById(id: number): Promise<CellphoneInterface | null> {
		return this.model.findByPk(id);
	}

	public async update(id: number, cellphone: CellphoneInterface) {
		const cellphoneFound = await this.model.findByPk(id);
		if (!cellphoneFound) {
			throw new NotFoundError("Cellphone not found");
		}

		return this.model.update(cellphone, { where: { id } });
	}

	public async delete(id: number) {
		const cellphoneFound = await this.model.findByPk(id);
		if (!cellphoneFound) {
			throw new NotFoundError("Cellphone not found");
		}
		return this.model.destroy({ where: { id } });
	}
}
