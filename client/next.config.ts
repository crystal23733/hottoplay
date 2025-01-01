import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/notices/:path*',
        destination: '/notices/:path*',
      },
    ];
  },
};

export default nextConfig;
