import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/old-path",
        destination: "/new-path",
      },
    ];
  },

  env: {
    SECRET_KEY: process.env.SECRET_KEY,
    NEXTAUTH_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
