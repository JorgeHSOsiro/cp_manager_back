import { Router } from "express";
import CellphoneController from "../controllers/cellphone.controller";

const router = Router();
const cellphoneController = new CellphoneController();

router
	.route("/cellphones")
	.get(cellphoneController.getAll)
	.post(cellphoneController.addProduct);
router
	.route("/cellphones/:id")
	.get(cellphoneController.getProductById)
	.put(cellphoneController.updateProduct)
	.delete(cellphoneController.deleteProduct);

export default router;
