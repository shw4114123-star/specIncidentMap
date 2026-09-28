import express from "express"
import "dotenv/config"
import cors from "cors"
import helmet from "helmet"
import { createServer } from "http"
import { Server } from "socket.io"
import "./db/db.js"
import authRouter from "./routes/auth.routes.js"
import incidentsRouter from "./routes/incidents.routes.js"
import { errorHandler } from "./utils/errorHandler.js"

const PORT = process.env.PORT
const app = express()
const server = createServer(app)
app.use(helmet())
app.use(express.json())
app.use(cors())
app.use("/auth", authRouter)
app.use("/incidents", incidentsRouter)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
})
app.use(errorHandler)

server.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT} / ws://localhost:${PORT}`);
})
