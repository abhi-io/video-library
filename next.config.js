/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['m.media-amazon.com', 'image.tmdb.org', 'localhost']
    // domains: ['127.0.0.1:8000']
  }
}

module.exports = nextConfig
