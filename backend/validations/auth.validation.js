import {z} from "zod";

export const userSchema = z.object({
    body: z.object({
        email: z.string().email("invalid email"),
        password: z.string().min(8, "password must be minimum 8 characters")
    })
})

export function validate(schema){
    return (req, _res, next) => {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query
        })
        if (!result.success) {
            const message = result.error?.issues[0]?.message
            const error = new Error(message)
            error.statusCode = 400
            return next(error)
        }
        if (result.data.body){
            req.body = result.data.body
        }
        next()
    }
}