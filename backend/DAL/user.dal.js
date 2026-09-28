import { ObjectId } from "mongodb";
import { db } from "../db/db.js"

const users = db.collection("users");

export async function createUserDAL(email, passHash) {
    const user = {email, passHash, createAt: new Date()}
    const result = await users.insertOne(user)
    user._id = result.insertedId
    return user
}

export async function getUserByEmail(email) {
    const user = await users.findOne({ email });
    return user
}

export async function getUserByIdDAL(userId) {
    const user = await users.findOne({_id: new ObjectId(userId)});
    return user    
}