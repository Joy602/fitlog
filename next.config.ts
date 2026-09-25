import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.magnific.com",
      },
      {
        protocol: "https",
        hostname: "**", // যেকোনো এক্সটার্নাল ইমেজের জন্য
      },
    ],
  },
};

export default nextConfig;
