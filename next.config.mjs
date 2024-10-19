/** @type {import('next').NextConfig} */

const nextConfig = { images: {
  remotePatterns: [{protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/uihbvros/**"}]
}, reactStrictMode: true, swcMinify: true }

export default nextConfig
