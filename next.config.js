/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
  images: {
    domains: ['localhost'],
  },
  output: 'standalone',
  // Configuraciones para mejorar la hidratación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = withNextIntl(nextConfig);
