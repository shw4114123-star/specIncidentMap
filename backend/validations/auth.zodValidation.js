import {z} from "zod";

export const userSchema = z.object({
    body: z.object({
        email: z.string().email("invalid email"),
        password: z.string().min(8, "password must be minimum 8 characters")
    })
})
