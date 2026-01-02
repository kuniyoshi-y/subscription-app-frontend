import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // ビルド時の値を埋め込む（SSRランタイムのprocess.envに依存しない）
    FASTAPI_BASE_URL: process.env.FASTAPI_BASE_URL,
  },
};

export default nextConfig;
