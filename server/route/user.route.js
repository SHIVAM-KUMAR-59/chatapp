import { Router } from "express";
import getFriendsController from "../controller/userController/getFriends.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import searchController from "../controller/userController/search.controller.js";
import addFriendController from "../controller/userController/addFriend.controller.js";
import removeFriendController from "../controller/userController/removeFriend.controller.js";
import getProfileController from "../controller/userController/getProfile.controller.js";
import editProfileController from "../controller/userController/editProfile.controller.js";

const router = Router();

router.use(authMiddleware)
router.get("/friends", getFriendsController)
router.get("/search", searchController)
router.post("/add-friend", addFriendController)
router.post("/remove-friend", removeFriendController)
router.get("/profile", getProfileController)
router.patch("/edit-profile", editProfileController)

export default router