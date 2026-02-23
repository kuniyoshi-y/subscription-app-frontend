import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: rootDir,
  },
  env: {
    // ビルド時の値を埋め込む（SSRランタイムのprocess.envに依存しない）
    FASTAPI_BASE_URL: process.env.FASTAPI_BASE_URL,
  },
};

export default nextConfig;
