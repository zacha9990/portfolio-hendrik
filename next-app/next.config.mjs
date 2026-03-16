/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qz-hendrik.com',
        pathname: '/media/**',
      },
    ],
  },
}

export default nextConfig
