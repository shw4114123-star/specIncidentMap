import { createError } from "./errorHandler.js";

let io;

export function initSocket(serverIo) {
    io = serverIo
}
export function getIo() {
    if (!io) throw new createError("socket not initialized", 500)
    return io
}