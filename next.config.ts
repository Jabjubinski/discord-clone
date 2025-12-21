import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "642wjyytlj.ufs.sh",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
