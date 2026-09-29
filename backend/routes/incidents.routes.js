import express from "express"
import { asyncWrapper } from "../utils/asyncWrapper.js"
import { authMiddleware } from "../utils/authMiddleware.js"
import {
    createIncidents,
    deleteIncidents,
    getAllIncidents,
    getIncidentsById,
    updateincidents
} from "../controller/incidents.ctrl.js"
import { incidentsSchema, updateIncidentsSchema } from "../validations/incident.zodValidation.js"
import { validate } from "../validations/validate.js"

const router = express.Router()

router.post("/", authMiddleware, validate(incidentsSchema), asyncWrapper(createIncidents))

router.get("/", authMiddleware, asyncWrapper(getAllIncidents))

router.get("/:id", authMiddleware, asyncWrapper(getIncidentsById))

router.patch("/:id", authMiddleware, validate(updateIncidentsSchema), asyncWrapper(updateincidents))

router.delete("/:id", authMiddleware, asyncWrapper(deleteIncidents))

export default router