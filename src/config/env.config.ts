import { z } from "zod"

const envSchema = z.object({
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
  HCAPTCHA_SECRET_KEY: z.string().min(1, "HCaptcha secret key is required"),
  HTB_API: z.string().default("https://www.hackthebox.com/api/v4"),
  HTB_PROFILE_ID: z.string().default("5833"),
  MONGODB_URI: z.string().url("Invalid MongoDB URI"),
  NEXT_PUBLIC_HCAPTCHA_SITEKEY: z
    .string()
    .min(1, "HCaptcha site key is required"),
  PAYLOAD_SECRET: z.string().min(1, "Payload secret is required"),
  RESEND_API_KEY: z.string().min(1, "Resend API key is required"),
})

type Env = z.infer<typeof envSchema>

let cachedEnv: Env | undefined

/**
 * Returns validated environment variables.
 * Caches the result for performance and to prevent double validation.
 * Throws if validation fails.
 */
export function getEnv(): Env {
  if (cachedEnv) return cachedEnv
  try {
    cachedEnv = envSchema.parse(process.env)
    return cachedEnv
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Print detailed errors in development
      if (process.env.NODE_ENV !== "production") {
        console.error("Environment variable validation failed:", error.errors)
      }
      throw new Error(
        "❌ Invalid environment variables:\n" +
          error.errors.map((e) => `- ${e.message}`).join("\n"),
      )
    }
    throw error
  }
}
