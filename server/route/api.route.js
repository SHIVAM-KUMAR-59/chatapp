import { Router } from "express"
import authRoutes from "./auth.route.js"
import errorHandlerMiddleware from "../middleware/error.middleware.js"

const router = Router();

router.use("/api/auth", authRoutes)
// router.use("/api/user")

router.use(errorHandlerMiddleware)

export default router