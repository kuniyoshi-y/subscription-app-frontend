import { fetchUpstreamJson } from "../_lib/http";
import { ok, error } from "../_lib/response";

export const GET = async () => {
  try {
    const categories = await fetchUpstreamJson<unknown>({ path: `/categories` });
    return ok(categories);
  } catch (e: any) {
    console.error("[BFF] GET /api/categories failed:", e);
    return error(e?.status ?? 500, "Failed to fetch categories", e);
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json(); // { name: string } を想定

    const created = await fetchUpstreamJson<unknown>({
      path: `/categories`,
      method: "POST",
      body,
    });

    return ok(created);
  } catch (e: any) {
    console.error("[BFF] POST /api/categories failed:", e);
    return error(e?.status ?? 500, "Failed to create category", e);
  }
};
