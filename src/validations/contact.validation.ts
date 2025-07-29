import { z } from "zod/v4"

export const getContactValidation = ({
  captcha,
  email,
  fullName,
  message,
}: {
  captcha: { error: string }
  email: { error: string }
  fullName: { error: string }
  message: { error: string }
}) =>
  z.object({
    captcha: z.string({ error: captcha.error }),
    email: z.email({ error: email.error }),
    fullName: z.string().min(2, {
      error: fullName.error,
    }),
    message: z.string().min(25, { error: message.error }),
    phoneNumber: z.string().optional(),
  })
