import { Request, Response } from "express";
import statusCodes from "../statusCodes";
import CellphoneService from "../services/cellphone.service";

export default class CellphoneController {
	private cellphoneService: CellphoneService;
	constructor(cellphoneService = new CellphoneService()) {
		this.cellphoneService = cellphoneService;
	}

	public getAll = async (_req: Request, res: Response) => {
		const cellphones = await this.cellphoneService.getAll();

		res.status(statusCodes.OK).json(cellphones);
	};

	public getProductById = async (req: Request, res: Response) => {
		const { id } = req.params;
		const product = await this.cellphoneService.getById(parseInt(id));
		if (!product) {
			res.status(statusCodes.NOT_FOUND).send("Product not found");
		}

		res.status(statusCodes.OK).json(product);
	};

	public addProduct = async (req: Request, res: Response) => {
		const product = req.body;
		const newProduct = await this.cellphoneService.create(product);

		res.status(statusCodes.CREATED).json(newProduct);
	};

	public updateProduct = async (req: Request, res: Response) => {
		const { id } = req.params;
		const product = req.body;
		const updatedProduct = await this.cellphoneService.update(
			parseInt(id),
			product
		);

		res.status(statusCodes.OK).json(updatedProduct);
	};

	public deleteProduct = async (req: Request, res: Response) => {
		const { id } = req.params;

		await this.cellphoneService.delete(parseInt(id));
		res.status(statusCodes.OK).send(`Deleted product with ID: ${id}`);
	};
}
