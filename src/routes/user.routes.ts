import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router
	.route("/user")
	.post((req, res) => userController.registerUser(req, res))
	.get((req, res) => userController.findUserByEmail(req, res));

router
	.route("/user/:id")
	.delete((req, res) => userController.deleteUser(req, res));

export default router;
