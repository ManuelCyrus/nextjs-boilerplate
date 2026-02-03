import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  loader: 'default',
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev',
        port: '', // Deixe vazio se não for usar uma porta específica
        pathname: '/**', // Permite qualquer caminho após o domínio
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
      },
    ];
  },
  env: {
    SECRET_KEY:process.env.SECRET_KEY,
    NEXTAUTH_URL: process.env.NEXT_PUBLIC_API_URL,
  },
    eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
