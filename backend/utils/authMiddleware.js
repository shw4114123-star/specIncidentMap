import { asyncWrapper } from "./asyncWrapper.js"
import { createError } from "./errorHandler.js"
import { verifyToken } from "./generateToken.js";


export const autoMiddleware = asyncWrapper(async (req, _res, next) => {
    const { authorization } = req.headers;
    if (!authorization) throw new createError("mising requierd header", 401);
    const token = authorization.split("Bearer ")[1];
    if (!token) throw new createError("mising requierd header", 401)
    const player = verifyToken(token);
    req.user = player;
    next()
})