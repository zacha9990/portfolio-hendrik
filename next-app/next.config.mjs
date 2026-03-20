/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qz-hendrik.com',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'qz-hendrik.com',
        port: '8443',
        pathname: '/media/**',
      },
    ],
  },
}

export default nextConfig
