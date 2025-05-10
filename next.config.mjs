/**
 * @type {import('next').NextConfig}
 */

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
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
        pathname: "/images/uihbvros/**",
        protocol: "https",
      },
    ],
  },
  reactStrictMode: true,
}

export default nextConfig
