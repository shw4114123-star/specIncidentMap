import { z } from "zod"

export const incidentsSchema = z.object({
    body: z.object({
        title: z.string(),
        description: z.string(),
        category: z.enum(["fire", "flood", "accident", "medical", "other"]),
        location: z.object({
            lng: z.number().min(-180, "invalid longitude").max(180, "invalid longitude"),
            lat: z.number().min(-90, "invalid latitude").max(90, "invalid latitude")
        })
    })
})

export const updateIncidentsSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        category: z.enum(["fire", "flood", "accident", "medical", "other"]).optional(),
        status: z.enum(["open", "in_progress", "closed"]).optional(),
        location: z.object({
            lng: z.number().min(-180, "invalid longitude").max(180, "invalid longitude").optional(),
            lat: z.number().min(-90, "invalid latitude").max(90, "invalid latitude").optional()
        }).optional()
    })
})