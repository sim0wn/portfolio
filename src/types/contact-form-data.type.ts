import { formSchema } from "@/validations"
import { z } from "zod"

export type ContactFormData = z.infer<typeof formSchema>
