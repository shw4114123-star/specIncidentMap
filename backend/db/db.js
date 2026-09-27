import { MongoClient } from "mongodb";
import "dotenv/config"

const client = new MongoClient(process.env.MONGO_URL || "mongodb://localhost:27017")
export const db = client.db("Incident-map")

try {
    client.connect()
    console.log("DB connected");
} catch (error) {
    console.error(error);
    process.exit(1)
}