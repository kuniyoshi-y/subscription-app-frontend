export { bffFetch } from "./fetcher";
export { ok, error } from "./response";

export const extractAuthHeader = (req: Request): Record<string, string> => {
  const auth = req.headers.get("Authorization");
  return auth ? { Authorization: auth } : {};
};
