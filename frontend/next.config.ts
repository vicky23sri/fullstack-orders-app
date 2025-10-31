import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: [
    // Move serverComponentsExternalPackages content here if any
  ],
  // Remove the experimental.serverComponentsExternalPackages
  experimental: {
    // Remove serverComponentsExternalPackages from here
  }
};

export default nextConfig;

