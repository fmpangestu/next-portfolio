import type { NextConfig } from "next";
import i18nConfig from "./next-i18next.config";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n: i18nConfig.i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "skillicons.dev",
        port: "",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
