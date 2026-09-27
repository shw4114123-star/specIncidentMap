import { createUserDAL, getUserByEmail } from "../DAL/user.dal.js";
import { passwordHash } from "../utils/bcryptPasswors.js";
import { createError } from "../utils/errorHandler.js";



export const createUser = async (req, res) => {
    const { email, password } = req.body;
    const exsistsUser = await getUserByEmail(email);
    if (exsistsUser) throw new createError("user alredy exists", 409);
    const passHash = await passwordHash(password);
    const user = await createUserDAL(email, passHash)
    delete user.passHash
    res.status(201).json({ success: true, data: user })
}