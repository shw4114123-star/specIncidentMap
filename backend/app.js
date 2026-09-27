import express from "express"
import "dotenv/config"
import cors from "cors"
import helmet from "helmet"
import {createServer} from "http"
import { Server } from "socket.io"

const PORT = process.env.PORT
const app = express()
const server = createServer(app)
app.use(helmet())
app.use(express.json())
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
})





server.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT} / ws://localhost:${PORT}`);
})