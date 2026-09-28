import express from "express"
import { asyncWrapper } from "../utils/asyncWrapper.js"
import { authMiddleware } from "../utils/authMiddleware.js"
import { createIncidents } from "../controller/incidents.ctrl.js"
import { incidentsSchema } from "../validations/incident.zodValidation.js"
import { validate } from "../validations/validate.js"

const router = express.Router()

router.post("/", authMiddleware, validate(incidentsSchema), asyncWrapper(createIncidents))

export default router