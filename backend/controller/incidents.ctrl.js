import { createIncidentsDAL } from "../DAL/incident.dal.js"



export const createIncidents = async (req, res) => {
    const { title, description, category, location } = req.body
    const { userId } = req.user
    const incidents = await createIncidentsDAL(title, description, category, location, userId)
    res.status(201).json({success: true, data: incidents})
}