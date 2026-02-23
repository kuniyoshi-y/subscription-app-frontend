import { bffFetch, ok, error } from "../../_lib";

const must = (v: string | undefined, name: string) => {
  if (!v) throw new Error(`${name} is not set`);
  return v;
};

export const GET = async () => {
  try {
    const summary = await bffFetch<unknown>({
      path: `/dashboard/summary`,
    });

    return ok(summary);
  } catch (e: any) {
    console.error("[BFF] /api/dashboard/summary failed:", e);
    return error(e?.status ?? 500, "Failed to fetch dashboard summary", e);
  }
};
