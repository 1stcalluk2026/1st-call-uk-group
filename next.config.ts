import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/download",
        destination: "https://app.1stcalluk.co.uk/download",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
