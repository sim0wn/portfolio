import HCaptcha from "@hcaptcha/react-hcaptcha"
import { forwardRef } from "react"

const HCaptchaWrapper = forwardRef<
  HCaptcha,
  Omit<Partial<HCaptcha["props"]>, "sitekey">
>((props, ref) => {
  return (
    <HCaptcha
      {...props}
      cleanup={true}
      ref={ref}
      sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
      theme={"contrast"}
    />
  )
})

HCaptchaWrapper.displayName = "HCaptcha"

export default HCaptchaWrapper
