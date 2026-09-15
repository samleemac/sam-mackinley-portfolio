import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Served at sammackinley.com/studio via a rewrite from the portfolio project.
  basePath: "/studio",
  outputFileTracingIncludes: {
    "/*": ["./Templates/**/*"],
  },
};

export default nextConfig;
