import express from "express"
import { createUser } from "../controller/auth.ctrl.js"
import { validate } from "../validations/auth.validation.js"
import { asyncWrapper } from "../utils/asyncWrapper.js"
import { createUserSchema } from "../utils/authMiddleware.js"

const router = express.Router()


router.post("/register", validate(createUserSchema), asyncWrapper(createUser));


export default router