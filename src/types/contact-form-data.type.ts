import { formSchema } from "@/schemas"
import { z } from "zod"

export type ContactFormData = z.infer<typeof formSchema>
