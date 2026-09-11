/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'media.indimba.com', 'picsum.photos', 'i.pravatar.cc'],
    formats: ['image/webp', 'image/avif'],
  },
};

module.exports = nextConfig;
