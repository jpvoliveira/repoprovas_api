import { Router } from "express";
import * as authController from "../controllers/authController.js"

const authRouter = Router()

authRouter.post('/sign-in', authController.signIn)
authRouter.post('/sign-up', authController.signUp)

export default authRouter