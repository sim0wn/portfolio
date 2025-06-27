import { withPayload } from "@payloadcms/next/withPayload"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/i18n/request.i18n.ts")

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    localPatterns: [
      {
        pathname: "/api/images/**",
      },
    ],
  },
  reactStrictMode: true,
  turbopack: {},
}

export default withPayload(withNextIntl(nextConfig), {
  devBundleServerPackages: false,
})
