/** @type {import('next').NextConfig} */
const nextConfig = {
  // Redirige "/" a la nueva home
  async redirects() {
    return [
      { source: "/", destination: "/newui", permanent: false },
    ];
  },

  // Reescribe rutas antiguas a las nuevas pantallas
  async rewrites() {
    return [
      { source: "/tickets", destination: "/newui/tickets" },
      { source: "/tickets/new", destination: "/newui/tickets/new" },
      { source: "/tickets/:id", destination: "/newui/tickets/:id" },
      // Agrega más si lo necesitas, por ejemplo:
      // { source: "/algo", destination: "/newui/algo" },
    ];
  },
};

module.exports = nextConfig;
