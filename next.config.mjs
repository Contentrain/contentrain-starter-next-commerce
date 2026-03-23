import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve(__dirname, "../../"),
  webpack(config) {
    config.resolve.alias["#contentrain"] = path.resolve(__dirname, ".contentrain/client/index.mjs");
    return config;
  },
};

export default nextConfig;
