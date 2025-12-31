export const env = {
  FASTAPI_BASE_URL: process.env.FASTAPI_BASE_URL ?? "",
} as const;

export const assertServerEnv = () => {
  if (!env.FASTAPI_BASE_URL) throw new Error("Missing FASTAPI_BASE_URL");
};
