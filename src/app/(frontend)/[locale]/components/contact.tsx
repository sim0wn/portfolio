"use client"

import HCaptcha from "@hcaptcha/react-hcaptcha"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"
import { useActionState, useEffect, useRef } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod/v4"

import { contactSubmissionAction } from "@/actions"
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/components"
import { getContactValidation } from "@/validations"

const HCaptchaWrapper = dynamic(() => import("@/components/hcaptcha-wrapper"), {
  ssr: false,
})

export function Contact() {
  const t = useTranslations("Actions.contact")
  const contactFormValidation = getContactValidation({
    captcha: { error: t("fields.captcha.errors.missing") },
    email: { error: t("fields.email.error") },
    fullName: {
      error: t("fields.fullName.error"),
    },
    message: { error: t("fields.message.error") },
  })

  const [state, formAction, isPending] = useActionState(
    contactSubmissionAction,
    { errors: {}, success: false },
  )
  const form = useForm<z.infer<typeof contactFormValidation>>({
    defaultValues: {
      captcha: "",
      email: "",
      fullName: "",
      message: "",
      phoneNumber: "",
    },
    mode: "onBlur",
    resolver: zodResolver(contactFormValidation),
  })
  const captchaRef = useRef<HCaptcha>(null)
  const { control, formState, reset } = form

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message.title, {
          description: state.message.description,
        })
        captchaRef.current?.resetCaptcha()
        reset()
      } else {
        toast.error(state.message.title, {
          description: state.message.description,
        })
      }
    }
  }, [state, reset])

  return (
    <FormProvider {...form}>
      <form action={formAction} className="space-y-2">
        <FormField
          control={control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.fullName.label")}</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.email.label")}</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@ac.me" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.phoneNumber.label")}</FormLabel>
              <FormControl>
                <Input placeholder="+55 (11) 11111-1111" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.message.label")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("fields.message.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <footer className="flex flex-col items-center space-y-2">
          {formState.isDirty && (
            <FormItem>
              <HCaptchaWrapper ref={captchaRef} />
              {formState.errors.captcha && (
                <FormMessage>{formState.errors.captcha.message}</FormMessage>
              )}
            </FormItem>
          )}
          <Button
            disabled={
              isPending || !formState.isValid || !form.getFieldState("captcha")
            }
            type="submit"
          >
            {isPending ? t("fields.submit.pending") : t("fields.submit.label")}
          </Button>
        </footer>
      </form>
    </FormProvider>
  )
}
