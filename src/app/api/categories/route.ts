import { bffFetch, ok, error, extractAuthHeader } from "../_lib";

export const GET = async (req: Request) => {
  try {
    const categories = await bffFetch<unknown>({
      path: `/categories`,
      headers: extractAuthHeader(req),
    });
    return ok(categories);
  } catch (e: any) {
    console.error("[BFF] GET /api/categories failed:", e);
    return error(e?.status ?? 500, "Failed to fetch categories", e);
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const created = await bffFetch<unknown>({
      path: `/categories`,
      method: "POST",
      body,
      headers: extractAuthHeader(req),
    });
    return ok(created);
  } catch (e: any) {
    console.error("[BFF] POST /api/categories failed:", e);
    return error(e?.status ?? 500, "Failed to create category", e);
  }
};
