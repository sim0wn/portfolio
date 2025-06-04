import { z } from "zod"

import { contactFormValidation } from "@/validations"

export type ContactFormData = z.infer<typeof contactFormValidation>

export type ContactFormState = {
  errors?: {
    captchaToken?: string[]
    email?: string[]
    fullName?: string[]
    message?: string[]
    phoneNumber?: string[]
  }
  message?: string
  success?: boolean
}
