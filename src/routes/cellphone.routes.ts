import { Router } from "express";
import CellphoneController from "../controllers/cellphone.controller";

const validateJWT = require("../auth/validateJWT");

const router = Router();
const cellphoneController = new CellphoneController();

router
	.route("/cellphones")
	.get(validateJWT, cellphoneController.getAll)
	.post(validateJWT, cellphoneController.addProduct);
router
	.route("/cellphones/:id")
	.get(cellphoneController.getProductById)
	.put(cellphoneController.updateProduct)
	.delete(cellphoneController.deleteProduct);

export default router;
