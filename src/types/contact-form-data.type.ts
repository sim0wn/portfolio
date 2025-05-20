import { z } from "zod"

import { contactFormValidation } from "@/validations"

export type ContactFormData = z.infer<typeof contactFormValidation>
