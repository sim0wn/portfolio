"use server"

import { verify } from "hcaptcha"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { Resend } from "resend"

import { getEnv } from "@/config"
import { getDictionary } from "@/lib"
import { ContactFormState } from "@/types"
import { getLocale } from "@/utils"
import { contactFormValidation } from "@/validations"

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const locale = getLocale(await headers())
  const {
    captcha: captchaDictionary,
    forms: {
      contact: { messages: contactMessagesDictionary },
    },
  } = await getDictionary(locale)
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
      message: contactMessagesDictionary.error.description,
    }
  }
  const { captchaToken, email, fullName, message, phoneNumber } =
    validatedFields.data

  if (!captchaToken) {
    return {
      errors: { captchaToken: [captchaDictionary.error] },
      message: captchaDictionary.error,
    }
  }

  const verifiedCaptcha = await verify(
    getEnv().HCAPTCHA_SECRET_KEY,
    captchaToken,
  )
  if (!verifiedCaptcha.success) {
    return {
      errors: { captchaToken: [captchaDictionary.expired] },
      message: captchaDictionary.expired,
    }
  }

  try {
    // TODO: use a template engine for the email body
    await new Resend(getEnv().RESEND_API_KEY).emails.send({
      from: "Contact Form <mail@resend.sim0wn.com>",
      html: `<strong>${fullName}</strong> contacted you. Here's the message: <br><br>${message}<br><br>Reply to <a href="mailto:${email}">${email}</a> or call ${phoneNumber}`,
      subject: "Contact Form Submission",
      to: "contact@sim0wn.com",
    })
    revalidatePath("/")

    return {
      message: contactMessagesDictionary.success.description,
      success: true,
    }
  } catch {
    return {
      message: contactMessagesDictionary.error.description,
      success: false,
    }
  }
}
