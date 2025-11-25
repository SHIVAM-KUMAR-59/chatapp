import { Router } from "express";
import getFriendsController from "../controller/userController/getFriends.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware)
router.get("/friends", getFriendsController)

export default router