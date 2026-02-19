/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['vercel.com', 'api.github.com'],
  },
};

module.exports = nextConfig;
