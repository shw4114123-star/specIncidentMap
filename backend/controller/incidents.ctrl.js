import {
    createIncidentsDAL,
    deleteIncidentsDAL,
    getAllIncidentsDAL,
    getIncidentsByIdDAL,
    updateincidentsDAL
} from "../DAL/incident.dal.js"
import { createError } from "../utils/errorHandler.js"
import { getIo } from "../utils/socket.js"

export const createIncidents = async (req, res) => {
    const { title, description, category, location } = req.body
    const { userId } = req.user
    const incidents = await createIncidentsDAL(title, description, category, location, userId)
    getIo().emit("incident:created", incidents)
    res.status(201).json({ success: true, data: incidents })
}

export const getAllIncidents = async (req, res) => {
    const { category } = req.query
    const incidents = await getAllIncidentsDAL(category)
    res.json({ success: true, data: incidents })
}

export const getIncidentsById = async (req, res) => {
    const { id } = req.params
    const incident = await getIncidentsByIdDAL(id)
    if (!incident) throw new createError("not found incidents", 404)
    res.json({ success: true, data: incident })
}

export const updateincidents = async (req, res) => {
    const { id } = req.params
    const body = req.body
    const { userId } = req.user
    const incident = await getIncidentsByIdDAL(id)
    if (!incident) throw new createError("not found incident", 404)
    if (incident.createdBy !== userId) throw new createError("not authorized to modify", 403)
    const update = await updateincidentsDAL(id, body)
    if (!update) throw new createError("not found incidents", 404);
    getIo().emit("incident:updated", update)
    res.json({ success: true, data: update })
}

export const deleteIncidents = async (req, res) => {
    const { id } = req.params
    const { userId } = req.user
    const incident = await getIncidentsByIdDAL(id)
    if (!incident) throw new createError("not found incident", 404)
    if (incident.createdBy !== userId) throw new createError("not authorized to modify", 403)
    const incidents = await deleteIncidentsDAL(id)
    if (incidents.deletedCount === 0) throw new createError("not found incidents", 404)
    getIo().emit("incident:deleted", { id })
    res.json({ success: true, data: incidents })
}