import { Router } from "express";
import CellphoneController from "../controllers/cellphone.controller";

const validateJWT = require("../auth/validateJWT");

const router = Router();
const cellphoneController = new CellphoneController();

router
	.route("/cellphones")
	.get(validateJWT, (req, res) => cellphoneController.getAll(req, res))
	.post(validateJWT, (req, res) => cellphoneController.addProduct(req, res));
router
	.route("/cellphones/:id")
	.get(validateJWT, (req, res) => cellphoneController.getProductById(req, res))
	.put(validateJWT, (req, res) => cellphoneController.updateProduct(req, res))
	.delete(validateJWT, (req, res) =>
		cellphoneController.deleteProduct(req, res)
	);

export default router;
