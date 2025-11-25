import { Router } from "express";
import getFriendsController from "../controller/userController/getFriends.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import searchController from "../controller/userController/search.controller.js";

const router = Router();

router.use(authMiddleware)
router.get("/friends", getFriendsController)
router.get("/search", searchController)

export default router