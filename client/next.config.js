/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Allow Cloudinary domain
  },
  // Enable static exports for production
  output: 'standalone',
  // Enable strict mode in development
  reactStrictMode: true,
}

module.exports = nextConfig
