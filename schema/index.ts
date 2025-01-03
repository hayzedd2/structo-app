import * as z from "zod"

export const structSchema = z.object({
    interface : z.string().min(1, {
        message : "More than one character is required"
    }),
    count: z.number()
    .min(1, { message: "The count must be at least 1" })
    .max(100, { message: "The count must not exceed 100" }),
    language : z.string().min(1,{
        message : "Language is required"
    })
})