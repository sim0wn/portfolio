"use client"

import { useToast } from "@/hooks/use-toast"
import { formSchema } from "@/validations"
import { ContactFormData } from "@/types/contact-form-data.type"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3"
import { FormProvider, useForm, useFormState } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Translation } from "@/lib/translations.lib"

export function ContactForm({
  translation,
}: {
  translation: Translation["landingPage"]
}) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
    >
      <Form translation={translation} />
    </GoogleReCaptchaProvider>
  )
}

function Form({ translation }: { translation: Translation["landingPage"] }) {
  const { contactForm } = translation
  const methods = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
  })

  const { handleSubmit, control, register } = methods
  const { errors } = useFormState({ control })

  const { toast } = useToast()
  const { executeRecaptcha } = useGoogleReCaptcha()

  const onSubmit = async ({
    fullName,
    email,
    phoneNumber,
    message,
  }: ContactFormData) => {
    let recaptchaToken = ""
    if (executeRecaptcha) {
      recaptchaToken = await executeRecaptcha("contact")
    }
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        phoneNumber,
        message,
        recaptchaToken,
      }),
    })
    const data = await response.json()
    if (response.ok) {
      toast({ variant: "default", description: data.message })
    } else {
      toast({ variant: "destructive", description: data.error })
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <FormItem>
          <FormLabel>{contactForm.fields.fullName}</FormLabel>
          <FormControl>
            <Input placeholder="John Doe" {...register("fullName")} />
          </FormControl>
          {errors.fullName && (
            <FormMessage>{errors.fullName.message}</FormMessage>
          )}
        </FormItem>
        <FormItem>
          <FormLabel>{contactForm.fields.email}</FormLabel>
          <FormControl>
            <Input placeholder="john.doe@ac.me" {...register("email")} />
          </FormControl>
          {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
        </FormItem>
        <FormItem>
          <FormLabel>{contactForm.fields.phoneNumber}</FormLabel>
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
          <FormLabel>{contactForm.fields.message}</FormLabel>
          <FormControl>
            <Textarea placeholder="" {...register("message")} />
          </FormControl>
          {errors.message && (
            <FormMessage>{errors.message.message}</FormMessage>
          )}
        </FormItem>
        <Button type="submit">{contactForm.fields.submit}</Button>
      </form>
    </FormProvider>
  )
}
