import { bffFetch, ok, error } from "../../_lib";

const pickIdFromUrl = (req: Request): string | null => {
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const id = parts[parts.length - 1];
  if (!id || id === "undefined" || id === "expenses") return null;
  return id;
};

export const GET = async (req: Request) => {
  try {
    const id = pickIdFromUrl(req);
    if (!id) return error(400, "Missing expense id");

    const expense = await bffFetch<unknown>({
      path: `/expenses/${encodeURIComponent(id)}`,
    });

    return ok(expense);
  } catch (e: any) {
    console.error("[BFF] GET /api/expenses/[id] failed:", e);
    return error(e?.status ?? 500, "Failed to fetch expense", e);
  }
};

export const PATCH = async (req: Request) => {
  try {
    const id = pickIdFromUrl(req);
    if (!id) return error(400, "Missing expense id");

    const body = await req.json();

    const updated = await bffFetch<unknown>({
      path: `/expenses/${encodeURIComponent(id)}`,
      method: "PATCH",
      body,
    });

    return ok(updated);
  } catch (e: any) {
    console.error("[BFF] PATCH /api/expenses/[id] failed:", e);
    return error(e?.status ?? 500, "Failed to update expense", e);
  }
};


export const DELETE = async (req: Request) => {
  try {
    const id = pickIdFromUrl(req);
    if (!id) return error(400, "Missing expense id");

    const result = await bffFetch<unknown>({
      path: `/expenses/${encodeURIComponent(id)}`,
      method: "DELETE",
    });

    return ok(result);
  } catch (e: any) {
    console.error("[BFF] DELETE /api/expenses/[id] failed:", e);
    return error(e?.status ?? 500, "Failed to delete expense", e);
  }
};
