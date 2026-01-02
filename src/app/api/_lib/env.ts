export const getServerEnv = () => {
  const FASTAPI_BASE_URL = process.env.FASTAPI_BASE_URL;
  if (!FASTAPI_BASE_URL) {
    throw new Error("Missing FASTAPI_BASE_URL");
  }

  return {
    FASTAPI_BASE_URL,
  } as const;
};
