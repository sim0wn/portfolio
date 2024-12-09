import { getTranslation } from "@/lib/translations.lib"
import { ContactFormData } from "@/types/contact-form-data.type"
import { getLocale } from "@/utils/locale.util"
import { contactFormValidation } from "@/validations"
import { verify } from "hcaptcha"
import { Resend } from "resend"

export async function POST(request: Request) {
  const { api: apiTranslation } = await getTranslation(await getLocale())
  const data = (await request.json()) as ContactFormData & {
    captchaToken: string
  }
  const parsedData = contactFormValidation.safeParse(data)
  const hCaptchaSecretKey = process.env.HCAPTCHA_SECRET_KEY

  if (!parsedData.success) {
    return Response.json({
      success: false,
      errors: parsedData.error.format(),
      message: apiTranslation.error,
    })
  }
  const { email, fullName, message, phoneNumber } = parsedData.data
  const { captchaToken } = data
  if (!hCaptchaSecretKey) {
    return Response.json(
      {
        success: false,
        errors: {},
        message: apiTranslation.error,
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
        success: false,
        errors: {},
        message: apiTranslation.captchaError,
      },
      {
        status: 400,
      },
    )
  }
  try {
    await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: "Contact Form <mail@resend.sim0wn.com>",
      to: "contact@sim0wn.com",
      subject: "Contact Form Submission",
      html: `<strong>${fullName}</strong> contacted you. Here's the message: <br><br>${message}<br><br>Reply to <a href="mailto:${email}">${email}</a> or call ${phoneNumber}`,
    })
    return Response.json(
      {
        success: true,
        message: apiTranslation.success,
      },
      { status: 200 },
    )
  } catch (error) {
    return Response.json(
      {
        success: false,
        errors: {},
        message: apiTranslation.error,
      },
      { status: 500 },
    )
  }
}
