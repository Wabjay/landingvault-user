import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/(.*)",
        has: [{ type: "host", value: "landingvault.com" }],
        destination: "https://landingvault.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['firebasestorage.googleapis.com', "example.com", "unsplash.com"],
  },
};

export default nextConfig;
