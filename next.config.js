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
    domains: ['utfs.io']
  }
};

module.exports = nextConfig;
