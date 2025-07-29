"use server"

import { verify } from "hcaptcha"
import { getTranslations } from "next-intl/server"
import { z } from "zod/v4"

import { getEnv } from "@/config"
import { payload } from "@/lib"
import { getContactValidation } from "@/validations"

const env = getEnv()

export async function contactSubmissionAction(_: unknown, formData: FormData) {
  const t = await getTranslations("Actions.contact")
  const contactValidation = getContactValidation({
    captcha: { error: t("fields.captcha.errors.missing") },
    email: { error: t("fields.email.error") },
    fullName: {
      error: t("fields.fullName.error"),
    },
    message: { error: t("fields.message.error") },
  })

  try {
    const { captcha, email, fullName, message, phoneNumber } =
      contactValidation.parse({
        captcha:
          formData.get("h-captcha-response") ||
          formData.get("g-recaptcha-response"),
        email: formData.get("email"),
        fullName: formData.get("fullName"),
        message: formData.get("message"),
        phoneNumber: formData.get("phoneNumber"),
      })
    const verifiedCaptcha = await verify(env.HCAPTCHA_SECRET_KEY, captcha)
    if (!verifiedCaptcha.success) {
      return {
        message: {
          description: t("fields.captcha.errors.invalid"),
          title: t("messages.error.title"),
        },
        success: false,
      }
    }
    await payload.create({
      collection: "contact-submissions",
      data: { email, fullName, message, phoneNumber },
    })
    return {
      message: {
        description: t("messages.success.description"),
        title: t("messages.success.title"),
      },
      success: true,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { errors: z.flattenError(error).fieldErrors, success: false }
    }
    return {
      message: {
        description: t("messages.error.description"),
        title: t("messages.error.title"),
      },
      success: false,
    }
  }
}
