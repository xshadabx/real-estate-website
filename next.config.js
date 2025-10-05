/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' for Vercel deployment
  trailingSlash: true,
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'images.pexels.com',
      'cdn.pixabay.com',
      'placehold.co',
    ],
    formats: ['image/webp', 'image/avif'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
