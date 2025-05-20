import { verify } from "hcaptcha"
import { Resend } from "resend"

import { getDictionary } from "@/lib"
import { ContactFormData } from "@/types/contact-form-data.type"
import { getLocale } from "@/utils/locale.util"
import { contactFormValidation } from "@/validations"

export async function POST(request: Request) {
  const { headers } = request
  const locale = getLocale(headers)
  const { api: apiTranslation } = await getDictionary(locale)
  const data = (await request.json()) as ContactFormData & {
    captchaToken: string
  }
  const parsedData = contactFormValidation.safeParse(data)
  const hCaptchaSecretKey = process.env.HCAPTCHA_SECRET_KEY

  if (!parsedData.success) {
    return Response.json({
      errors: parsedData.error.format(),
      message: apiTranslation.error,
      success: false,
    })
  }
  const { email, fullName, message, phoneNumber } = parsedData.data
  const { captchaToken } = data
  if (!hCaptchaSecretKey) {
    return Response.json(
      {
        errors: {},
        message: apiTranslation.error,
        success: false,
      },
      {
        status: 500,
      },
    )
  }
  const captcha = await verify(hCaptchaSecretKey, captchaToken)
  if (!captcha.success) {
    return Response.json(
      {
        errors: {},
        message: apiTranslation.captchaError,
        success: false,
      },
      {
        status: 400,
      },
    )
  }
  try {
    await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: "Contact Form <mail@resend.sim0wn.com>",
      html: `<strong>${fullName}</strong> contacted you. Here's the message: <br><br>${message}<br><br>Reply to <a href="mailto:${email}">${email}</a> or call ${phoneNumber}`,
      subject: "Contact Form Submission",
      to: "contact@sim0wn.com",
    })
    return Response.json(
      {
        message: apiTranslation.success,
        success: true,
      },
      { status: 200 },
    )
  } catch {
    return Response.json(
      {
        errors: {},
        message: apiTranslation.error,
        success: false,
      },
      { status: 500 },
    )
  }
}
