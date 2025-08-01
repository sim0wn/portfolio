import withBundleAnalyzer from "@next/bundle-analyzer"
import { withPayload } from "@payloadcms/next/withPayload"
import { withSentryConfig } from "@sentry/nextjs"
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

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(
  withSentryConfig(
    withPayload(withNextIntl(nextConfig), {
      devBundleServerPackages: false,
    }),
    {
      // For all available options, see:
      // https://www.npmjs.com/package/@sentry/webpack-plugin#options

      // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
      // See the following for more information:
      // https://docs.sentry.io/product/crons/
      // https://vercel.com/docs/cron-jobs
      automaticVercelMonitors: true,
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,

      org: "sim0wn",

      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      project: "portfolio",

      // Only print logs for uploading source maps in CI
      silent: !process.env.CI,

      // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
      // This can increase your server load as well as your hosting bill.
      // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
      // side errors will fail.
      tunnelRoute: "/monitoring",

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,
    },
  ),
)
