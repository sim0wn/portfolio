"use client"

import HCaptcha from "@hcaptcha/react-hcaptcha"
import { zodResolver } from "@hookform/resolvers/zod"
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
  Textarea,
} from "@/components"
import { Dictionary } from "@/lib"
import { ContactFormData, ContactFormState } from "@/types"
import { contactFormValidation } from "@/validations"

const initialState: ContactFormState = { message: "" }

export function ContactForm({
  contactFormDictionary,
}: {
  contactFormDictionary: Dictionary["forms"]["contact"]
}) {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  )

  const methods = useForm<ContactFormData>({
    resolver: zodResolver(contactFormValidation),
  })
  const { control, register, reset } = methods
  const { errors } = useFormState({ control })

  const captchaRef = useRef<HCaptcha | null>(null)
  const [token, setToken] = useState<null | string>(null)

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast(contactFormDictionary.messages.success.title, {
          description: state.message,
          duration: 10000,
        })
        reset()
        setToken(null)
      } else {
        toast(contactFormDictionary.messages.error.title, {
          description: state.message,
          duration: 5000,
        })
      }
    }
    captchaRef.current?.resetCaptcha()
  }, [state, reset, contactFormDictionary])

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
          <FormLabel>{contactFormDictionary.fields.fullName}</FormLabel>
          <FormControl>
            <Input placeholder="John Doe" {...register("fullName")} />
          </FormControl>
          {errors.fullName && (
            <FormMessage>{errors.fullName.message}</FormMessage>
          )}
        </FormItem>

        <FormItem>
          <FormLabel>{contactFormDictionary.fields.email}</FormLabel>
          <FormControl>
            <Input placeholder="john.doe@ac.me" {...register("email")} />
          </FormControl>
          {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
        </FormItem>

        <FormItem>
          <FormLabel>{contactFormDictionary.fields.phoneNumber}</FormLabel>
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
          <FormLabel>{contactFormDictionary.fields.message}</FormLabel>
          <FormControl>
            <Textarea placeholder="" {...register("message")} />
          </FormControl>
          {errors.message && (
            <FormMessage>{errors.message.message}</FormMessage>
          )}
        </FormItem>

        <footer className="flex flex-col items-center justify-between space-y-2">
          <HCaptcha
            onVerify={(token) => setToken(token)}
            ref={captchaRef}
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY || ""}
            theme={"dark"}
          />
          {state.errors?.captchaToken && (
            <FormMessage>{state.errors.captchaToken[0]}</FormMessage>
          )}

          <Button disabled={isPending || !token} type="submit">
            {isPending
              ? contactFormDictionary.messages.pending
              : contactFormDictionary.fields.submit}
          </Button>
        </footer>
      </form>
    </FormProvider>
  )
}
