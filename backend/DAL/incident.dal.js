import { ObjectId } from "mongodb";
import { db } from "../db/db.js"

const incidents = db.collection("incidents");

export async function createIncidentsDAL(title, description, category, location, userId) {
    const incident = { title, description, category, location, createdBy: userId, status: "open", createdAt: new Date(), updatedAt: new Date() }
    const result = await incidents.insertOne(incident)
    incident._id = result.insertedId
    return incident
}

export async function getAllIncidentsDAL(category) {
    if (!category) {
        const result = await incidents.find().toArray();
        return result
    }
    const result = await incidents.find({ category }).toArray();
    return result
}

export async function getIncidentsByIdDAL(id) {
    const result = await incidents.findOne({ _id: new ObjectId(id) })
    return result
}

export async function updateincidentsDAL(id, body) {
    body.updatedAt = new Date()
    const result = await incidents.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: body },
        { returnDocument: "after" })
    console.log(result);
    return result
}

export async function deleteIncidentsDAL(id) {
    const result = await incidents.deleteOne({_id: new ObjectId(id)})
    return result
}