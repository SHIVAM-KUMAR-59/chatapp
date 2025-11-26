import { Router } from "express";
import getFriendsController from "../controller/userController/getFriends.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import searchController from "../controller/userController/search.controller.js";
import addFriendController from "../controller/userController/addFriend.controller.js";

const router = Router();

router.use(authMiddleware)
router.get("/friends", getFriendsController)
router.get("/search", searchController)
router.post("/add-friend", addFriendController)

export default router