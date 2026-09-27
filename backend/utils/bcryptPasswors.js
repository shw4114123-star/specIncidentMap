import bcrypt from "bcrypt"

export const passwordHash = async (password) =>{
    return bcrypt.hash(password, 10);
}

export const passwordCompare = (password, passHash) => {
    return bcrypt.compare(password, passHash);
}