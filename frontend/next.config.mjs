/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:call*',
            destination: 'http://localhost:8080/api/:call*',
          },
        ]
      },
};

export default nextConfig;
