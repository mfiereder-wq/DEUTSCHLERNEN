import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel nutzt Standard-Output; eigener Server setzt BUILD_STANDALONE=1
  ...(process.env.BUILD_STANDALONE === "1" ? { output: "standalone" } : {}),
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
};

export default nextConfig;
