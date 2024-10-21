import { getTranslation } from "@/lib/translations.lib"
import { formSchema } from "@/schemas"
import { ContactFormData } from "@/types/contact-form-data.type"
import { getLocale } from "@/utils/locale.util"
import { Resend } from "resend"

export async function POST(request: Request) {
  const { fullName, email, phoneNumber, message, recaptchaToken } =
    (await request.json()) as ContactFormData & { recaptchaToken: string }
  const { api: apiTranslation } = await getTranslation(getLocale())

  const validationResult = formSchema.safeParse({
    fullName,
    email,
    phoneNumber,
    message,
    recaptchaToken,
  })

  const minimumCaptchaScore = 0.7
  const secretKey = process.env.RECAPTCHA_SECRET_KEY || ""
  const data = new FormData()
  data.append("secret", secretKey)
  data.append("response", recaptchaToken)
  const captchaResponse = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      body: data,
    },
  )
  const res = await captchaResponse.json()
  if (res.score && res.score >= minimumCaptchaScore) {
    if (!validationResult.success) {
      return Response.json(
        {
          error: apiTranslation.error,
        },
        { status: 400 },
      )
    } else {
      await new Resend(process.env.RESEND_API_KEY).emails.send({
        from: "Contact Form <mail@resend.sim0wn.com>",
        to: "contact@sim0wn.com",
        subject: "Contact Form Submission",
        html: `<strong>${fullName}</strong> contacted you. Here's the message: <br><br>${message}<br><br>Reply to <a href="mailto:${email}">${email}</a> or call ${phoneNumber}`,
      })
      return Response.json({ message: apiTranslation.success })
    }
  } else {
    return Response.json(
      {
        error: apiTranslation.recaptchaError,
      },
      { status: 400 },
    )
  }
}
