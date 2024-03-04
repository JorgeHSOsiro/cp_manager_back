import { Router } from "express";
import UserController from "../controllers/user.controller";
import LoginController from "../controllers/login.controller";

const router = Router();
const userController = new UserController();
const loginControle = new LoginController();

router
	.route("/user")
	.post((req, res) => userController.registerUser(req, res))
	.get((req, res) => userController.findUserByEmail(req, res));

router
	.route("/user/:id")
	.delete((req, res) => userController.deleteUser(req, res));

router.post("/login", (req, res) => loginControle.login(req, res));

export default router;
