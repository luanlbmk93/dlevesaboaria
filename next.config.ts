import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  async redirects() {
    return [
      { source: '/admin/login', destination: '/admin/entrar', permanent: true },
      { source: '/admin/products', destination: '/admin/produtos', permanent: true },
      { source: '/admin/products/new', destination: '/admin/produtos/novo', permanent: true },
      { source: '/admin/products/:id/edit', destination: '/admin/produtos/:id/editar', permanent: true },
    ];
  },
};

export default nextConfig;
