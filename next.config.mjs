import { withPayload } from "@payloadcms/next/withPayload"

/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async function headers() {
    return [
      {
        headers: [
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
        source: "/api/:path*",
      },
    ]
  },
  images: {
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    localPatterns: [
      {
        pathname: "/api/media/**",
      },
      {
        pathname: "/icons/**",
      },
    ],
    remotePatterns: [],
  },
  reactStrictMode: true,
  turbopack: {},
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
