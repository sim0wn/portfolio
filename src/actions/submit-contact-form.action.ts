"use server"

import { verify } from "hcaptcha"
import { getTranslations } from "next-intl/server"
import { revalidatePath } from "next/cache"
import { Resend } from "resend"

import { getEnv } from "@/config"
import { ContactFormState } from "@/types"
import { contactFormValidation } from "@/validations"

const env = getEnv()

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const t = await getTranslations("Actions")
  const rawFormData = {
    captchaToken: formData.get("captchaToken"),
    email: formData.get("email"),
    fullName: formData.get("fullName"),
    message: formData.get("message"),
    phoneNumber: formData.get("phoneNumber"),
  }

  const validatedFields = contactFormValidation.safeParse(rawFormData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: t("contact.messages.error.description"),
    }
  }
  const { captchaToken, email, fullName, message, phoneNumber } =
    validatedFields.data

  if (!captchaToken) {
    return {
      errors: { captchaToken: [t("captcha.error")] },
      message: t("captcha.error"),
    }
  }

  const verifiedCaptcha = await verify(env.HCAPTCHA_SECRET_KEY, captchaToken)
  if (!verifiedCaptcha.success) {
    return {
      errors: { captchaToken: [t("captcha.expired")] },
      message: t("captcha.expired"),
    }
  }

  try {
    // TODO: use a template engine for the email body
    await new Resend(env.RESEND_API_KEY).emails.send({
      from: "Contact Form <mail@resend.sim0wn.rocks>",
      html: `<strong>${fullName}</strong> contacted you. Here's the message: <br><br>${message}<br><br>Reply to <a href="mailto:${email}">${email}</a> or call ${phoneNumber}`,
      subject: "Contact Form Submission",
      to: "contact@sim0wn.rocks",
    })
    revalidatePath("/")

    return {
      message: t("contact.messages.success.description"),
      success: true,
    }
  } catch {
    return {
      message: t("contact.messages.error.description"),
      success: false,
    }
  }
}
