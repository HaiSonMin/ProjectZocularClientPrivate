/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false
      }
    ];
  },
  images: {
    domains: ['utfs.io'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9001',
        pathname: '/**'
      }
    ]
  }
};

module.exports = nextConfig;
