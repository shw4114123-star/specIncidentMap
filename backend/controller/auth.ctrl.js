import { createUserDAL, getUserByEmail, getUserByIdDAL } from "../DAL/user.dal.js";
import { passwordCompare, passwordHash } from "../utils/bcryptPasswors.js";
import { createError } from "../utils/errorHandler.js";
import { generateToken } from "../utils/generateToken.js";


export const createUser = async (req, res) => {
    const { email, password } = req.body;
    const existsUser = await getUserByEmail(email);
    if (existsUser) throw new createError("user alredy exists", 409);
    const passHash = await passwordHash(password);
    const user = await createUserDAL(email, passHash)
    delete user.passHash
    res.status(201).json({ success: true, data: user })
}


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const existsUser = await getUserByEmail(email);
    if (!existsUser) throw new createError("not found", 404)
    const passCompare = await passwordCompare(password, existsUser.passHash);
    if (!passCompare) throw new createError("password / email not correct", 400);
    const token = generateToken(existsUser._id);
    delete existsUser.passHash
    res.json({ success: true, data: { ...existsUser, token } })
}

export const getUserById = async (req, res) => {
    const { userId } = req.user;
    const userById = await getUserByIdDAL(userId);
    if (!userById) throw new createError("not found", 404);
    delete userById.passHash;
    res.json({ success: true, data: userById });
}