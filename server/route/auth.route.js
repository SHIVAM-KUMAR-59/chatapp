import { Router } from "express";
import reqBodyMiddleware from '../middleware/reqBody.middleware.js'
import signupController from "../controller/authController/signup.controller.js";
import loginController from "../controller/authController/login.controller.js";

const router = Router();

router.post("/signup", reqBodyMiddleware, signupController)
router.post("/login", reqBodyMiddleware, loginController)

export default router