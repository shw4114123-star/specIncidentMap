import { db } from "../db/db.js"

const incidents = db.collection("incidents");

export async function createIncidentsDAL(title, description, category, location, userId) {
    const incident = { title, description, category, location, createBy: userId, status: "open", createAt: new Date(), updateAt: new Date() }
    const result = await incidents.insertOne(incident)
    incident._id = result.insertedId
    return incident
}
