import { bffFetch, ok, error, extractAuthHeader } from "../../_lib";

export const GET = async (req: Request) => {
  try {
    const summary = await bffFetch<unknown>({
      path: `/dashboard/summary`,
      headers: extractAuthHeader(req),
    });
    return ok(summary);
  } catch (e: any) {
    console.error("[BFF] /api/dashboard/summary failed:", e);
    return error(e?.status ?? 500, "Failed to fetch dashboard summary", e);
  }
};
