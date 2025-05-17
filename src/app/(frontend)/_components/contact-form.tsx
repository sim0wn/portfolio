"use client"

import {
  Button,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/components/ui"
import { useToast } from "@/hooks"
import { Dictionary } from "@/lib"
import { ContactFormData } from "@/types/contact-form-data.type"
import { contactFormValidation } from "@/validations"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, useState, useTransition } from "react"
import { FormProvider, useForm, useFormState } from "react-hook-form"

export function ContactForm({
  translation,
}: {
  translation: Dictionary["landingPage"]
}) {
  const { contactForm } = translation

  const methods = useForm<ContactFormData>({
    resolver: zodResolver(contactFormValidation),
  })
  const { control, handleSubmit, register } = methods
  const { errors } = useFormState({ control })

  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const captchaRef = useRef<HCaptcha | null>(null)
  const [token, setToken] = useState<null | string>(null)

  const onSubmit = (data: ContactFormData) => {
    startTransition(async () => {
      const response = await fetch("/api/contact", {
        body: JSON.stringify({
          ...data,
          captchaToken: token,
        } as ContactFormData),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })

      try {
        const data = await response.json()
        if (response.ok) {
          toast({
            description: data.message,
            duration: 10000,
            title: contactForm.status.success,
            variant: "default",
          })
          methods.reset()
        } else {
          toast({
            description: data.message,
            duration: 5000,
            title: contactForm.status.error,
            variant: "destructive",
          })
        }
      } catch {
        toast({
          description: "Oops!",
          duration: 2000,
          title: contactForm.status.error,
          variant: "destructive",
        })
      } finally {
        captchaRef.current?.resetCaptcha()
      }
    })
  }

  return (
    <FormProvider {...methods}>
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
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
        <footer className="flex flex-col items-center justify-between space-y-2">
          <HCaptcha
            onVerify={(token) => setToken(token)}
            ref={captchaRef}
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY || ""}
            theme={"dark"}
          />
          <Button disabled={isPending} type="submit">
            {isPending ? contactForm.status.pending : contactForm.fields.submit}
          </Button>
        </footer>
      </form>
    </FormProvider>
  )
}
