/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/socket',
          destination: '/api/socket', // Ensure the WebSocket route is correctly handled
        },
      ];
    },
  };
  
  export default nextConfig;
  