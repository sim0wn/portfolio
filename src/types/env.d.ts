declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BLOB_READ_WRITE_TOKEN?: string
      HCAPTCHA_SECRET_KEY: string
      HTB_API?: string
      HTB_PROFILE_ID?: string
      MONGODB_URI: string
      NEXT_PUBLIC_HCAPTCHA_SITEKEY: string
      PAYLOAD_SECRET: string
      RESEND_API_KEY: string
    }
  }
}

export {}
