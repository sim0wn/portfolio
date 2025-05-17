import { z } from "zod"

export const contactFormValidation = z.object({
  email: z.string().email({ message: "Invalid email." }),
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
  phoneNumber: z.string().optional(),
})
