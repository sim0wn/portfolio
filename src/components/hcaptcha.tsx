import HCaptcha from "@hcaptcha/react-hcaptcha"
import { forwardRef, useImperativeHandle, useRef } from "react"

export interface HCaptchaHandlers {
  execute: () => void
  resetCaptcha: () => void
}

const WrappedHCaptcha = forwardRef<
  HCaptchaHandlers,
  Partial<HCaptcha["props"]>
>((props, ref) => {
  // eslint-disable-next-line
  const innerRef = useRef<any>(null)

  useImperativeHandle(ref, () => ({
    execute: () => innerRef.current?.execute(),
    resetCaptcha: () => innerRef.current?.resetCaptcha(),
  }))
  return (
    <HCaptcha
      {...props}
      ref={innerRef}
      sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY || ""}
    />
  )
})

WrappedHCaptcha.displayName = "HCaptcha"

export default WrappedHCaptcha
