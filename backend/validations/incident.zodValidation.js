import {z} from "zod"

export const incidentsSchema = z.object({
    body: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        location: z.object({
            lng: z.number(),
            lat: z.number()
        })
    })
})