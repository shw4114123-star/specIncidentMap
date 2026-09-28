import express from "express"
import { createUser, getUserById, loginUser } from "../controller/auth.ctrl.js"
import { userSchema, validate } from "../validations/auth.validation.js"
import { asyncWrapper } from "../utils/asyncWrapper.js"
import { autoMiddleware } from "../utils/authMiddleware.js"

const router = express.Router()


router.post("/register", validate(userSchema), asyncWrapper(createUser));

router.post("/login", validate(userSchema), asyncWrapper(loginUser))

router.get("/me", autoMiddleware, asyncWrapper(getUserById))

export default router