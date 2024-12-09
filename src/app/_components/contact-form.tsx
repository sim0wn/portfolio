"use client"

import { ContactFormData } from "@/types/contact-form-data.type"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { contactFormValidation } from "@/validations"
import { useRef, useState, useTransition } from "react"
import { useToast } from "@/hooks/use-toast"
import HCaptcha from "@hcaptcha/react-hcaptcha"

export function ContactForm({
  translation,
}: {
  translation: Translation["landingPage"]
}) {
  const { contactForm } = translation

  const methods = useForm<ContactFormData>({
    resolver: zodResolver(contactFormValidation),
  })
  const { handleSubmit, control, register } = methods
  const { errors } = useFormState({ control })

  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const captchaRef = useRef<HCaptcha | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const onSubmit = (data: ContactFormData) => {
    startTransition(async () => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          captchaToken: token,
        } as ContactFormData),
      })

      try {
        const data = await response.json()
        if (response.ok) {
          toast({
            variant: "default",
            description: data.message,
            duration: 10000,
            title: contactForm.status.success,
          })
          methods.reset()
        } else {
          toast({
            variant: "destructive",
            description: data.message,
            title: contactForm.status.error,
            duration: 5000,
          })
        }
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Oops!",
          duration: 2000,
          title: contactForm.status.error,
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
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY || ""}
            theme={"dark"}
            onVerify={(token) => setToken(token)}
            ref={captchaRef}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? contactForm.status.pending : contactForm.fields.submit}
          </Button>
        </footer>
      </form>
    </FormProvider>
  )
}
