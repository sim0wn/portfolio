"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"
import { Suspense, useActionState, useEffect, useRef, useState } from "react"
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
import { HCaptchaHandlers } from "@/components/hcaptcha"
import { ContactFormData, ContactFormState } from "@/types"
import { contactFormValidation } from "@/validations"

const HCaptcha = dynamic(() => import("@/components/hcaptcha"), {
  ssr: false,
})

const initialState: ContactFormState = { message: "" }

export function Contact() {
  const t = useTranslations("Actions.contact")

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
  const captchaRef = useRef<HCaptchaHandlers | null>(null)
  const [token, setToken] = useState<null | string>(null)

  const formFooterRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast(t("messages.success.title"), {
          description: state.message,
          duration: 10000,
        })
        reset()
        setToken(null)
      } else {
        toast(t("messages.error.title"), {
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
    if (captchaVisible) return // Already visible, don't observe again
    const el = formFooterRef.current
    if (!el) return

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
          <FormLabel>{t("fields.fullName")}</FormLabel>
          <FormControl>
            <Input placeholder="John Doe" {...register("fullName")} />
          </FormControl>
          {errors.fullName && (
            <FormMessage>{errors.fullName.message}</FormMessage>
          )}
        </FormItem>

        <FormItem>
          <FormLabel>{t("fields.email")}</FormLabel>
          <FormControl>
            <Input placeholder="john.doe@ac.me" {...register("email")} />
          </FormControl>
          {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
        </FormItem>

        <FormItem>
          <FormLabel>{t("fields.phoneNumber")}</FormLabel>
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
          <FormLabel>{t("fields.message")}</FormLabel>
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
          {captchaVisible && (
            <Suspense fallback={<Skeleton className="bg- h-10 w-full" />}>
              <HCaptcha onVerify={setToken} ref={captchaRef} theme="dark" />
            </Suspense>
          )}
          {state.errors?.captchaToken && (
            <FormMessage>{state.errors.captchaToken[0]}</FormMessage>
          )}
          <Button disabled={isPending || !token} type="submit">
            {isPending ? t("messages.pending") : t("fields.submit")}
          </Button>
        </footer>
      </form>
    </FormProvider>
  )
}
