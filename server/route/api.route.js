import { Router } from "express"
import authRoutes from "./auth.route.js"
import userRoutes from "./user.route.js"
import errorHandlerMiddleware from "../middleware/error.middleware.js"

const router = Router();

router.use("/api/auth", authRoutes)
router.use("/api/user", userRoutes)

router.use(errorHandlerMiddleware)

export default router