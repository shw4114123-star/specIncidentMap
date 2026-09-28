import express from "express"
import { createUser, getUserById, loginUser } from "../controller/auth.ctrl.js"
import { userSchema } from "../validations/auth.zodValidation.js"
import { asyncWrapper } from "../utils/asyncWrapper.js"
import { authMiddleware } from "../utils/authMiddleware.js"
import { validate } from "../validations/validate.js"

const router = express.Router()

router.post("/register", validate(userSchema), asyncWrapper(createUser));

router.post("/login", validate(userSchema), asyncWrapper(loginUser))

router.get("/me", authMiddleware, asyncWrapper(getUserById))

export default router