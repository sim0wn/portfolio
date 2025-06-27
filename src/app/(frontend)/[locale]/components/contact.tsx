"use client"

import HCaptcha from "@hcaptcha/react-hcaptcha"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"
import { useActionState, useEffect, useRef, useState } from "react"
import { FormProvider, useForm, useFormState } from "react-hook-form"
import { toast } from "sonner"

import { submitContactForm } from "@/actions"
import {
  Button,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Skeleton,
  Textarea,
} from "@/components"
import { ContactFormData, ContactFormState } from "@/types"
import { contactFormValidation } from "@/validations"

const HCaptchaWrapper = dynamic(() => import("@/components/hcaptcha-wrapper"), {
  ssr: false,
})

const initialState: ContactFormState = { message: "" }

export function Contact() {
  const t = useTranslations("Actions")

  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  )

  const methods = useForm<ContactFormData>({
    resolver: zodResolver(contactFormValidation),
  })
  const { control, register, reset } = methods
  const { errors } = useFormState({ control })

  const [captchaVisible, setCaptchaVisible] = useState(false)
  const captchaRef = useRef<HCaptcha>(null)
  const [token, setToken] = useState<null | string>(null)

  const formFooterRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast(t("contact.messages.success.title"), {
          description: state.message,
          duration: 10000,
        })
        reset()
        setToken(null)
      } else {
        toast(t("contact.messages.error.title"), {
          description: state.message,
          duration: 5000,
        })
      }
    }
    captchaRef.current?.resetCaptcha()
  }, [state, reset, t])

  useEffect(() => {
    if (state.errors) {
      Object.entries(state.errors).forEach(([field, messages]) => {
        if (messages && messages.length > 0 && field !== "captchaToken") {
          methods.setError(field as keyof ContactFormData, {
            message: messages[0],
          })
        }
      })
    }
  }, [state.errors, methods])

  // IntersectionObserver to lazy load captcha
  useEffect(() => {
    const el = formFooterRef.current
    if (captchaVisible || !el) {
      return
    }

    const observer = new window.IntersectionObserver(
      (entries, obs) => {
        if (entries[0].isIntersecting) {
          setCaptchaVisible(true)
          obs.disconnect()
        }
      },
      { root: null, threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [captchaVisible])

  const handleSubmit = (formData: FormData) => {
    if (token) {
      formData.set("captchaToken", token)
    }
    formAction(formData)
  }

  return (
    <FormProvider {...methods}>
      <form action={handleSubmit} className="space-y-2">
        <FormItem>
          <FormLabel>{t("contact.fields.fullName")}</FormLabel>
          <FormControl>
            <Input placeholder="John Doe" {...register("fullName")} />
          </FormControl>
          {errors.fullName && (
            <FormMessage>{errors.fullName.message}</FormMessage>
          )}
        </FormItem>

        <FormItem>
          <FormLabel>{t("contact.fields.email")}</FormLabel>
          <FormControl>
            <Input placeholder="john.doe@ac.me" {...register("email")} />
          </FormControl>
          {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
        </FormItem>

        <FormItem>
          <FormLabel>{t("contact.fields.phoneNumber")}</FormLabel>
          <FormControl>
            <Input
              placeholder="+55 (11) 11111-1111"
              {...register("phoneNumber")}
            />
          </FormControl>
          {errors.phoneNumber && (
            <FormMessage>{errors.phoneNumber.message}</FormMessage>
          )}
        </FormItem>

        <FormItem>
          <FormLabel>{t("contact.fields.message")}</FormLabel>
          <FormControl>
            <Textarea placeholder="" {...register("message")} />
          </FormControl>
          {errors.message && (
            <FormMessage>{errors.message.message}</FormMessage>
          )}
        </FormItem>

        <footer
          className="flex flex-col items-center justify-between space-y-2"
          ref={formFooterRef}
        >
          {captchaVisible ? (
            <HCaptchaWrapper onVerify={setToken} ref={captchaRef} />
          ) : (
            <Skeleton className="h-18 w-full" />
          )}
          {state.errors?.captchaToken && (
            <FormMessage>{state.errors.captchaToken[0]}</FormMessage>
          )}
          <Button disabled={isPending || !token} type="submit">
            {isPending
              ? t("contact.messages.pending")
              : t("contact.fields.submit")}
          </Button>
        </footer>
      </form>
    </FormProvider>
  )
}
