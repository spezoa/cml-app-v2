/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/newui", permanent: false },
    ];
  },
};
module.exports = nextConfig;
