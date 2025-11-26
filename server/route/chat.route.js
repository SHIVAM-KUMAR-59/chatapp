import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import getMessagesController from "../controller/chatController/getMessages.controller.js";

const router = Router();

router.use(authMiddleware)
router.get("/messages/:userId", getMessagesController)

export default router