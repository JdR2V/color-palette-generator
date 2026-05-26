import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Static HTML export
  trailingSlash: true, // Needed for GitHub Pages routing
  basePath:
    process.env.NODE_ENV === "production"
      ? "/color-palette-generator" // Must match your repo name exactly
      : "",
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
