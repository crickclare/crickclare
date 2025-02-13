/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["picsum.photos", "ui-avatars.com"],
    },
    async redirects() {
      return [
        {
          source: "/search",
          destination: "/",
          permanent: false,
        },
      ]
    },
  }
  
  module.exports = nextConfig
  