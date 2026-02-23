import { bffFetch, ok, error } from "../_lib";

export const GET = async () => {
  try {
    const data = await bffFetch<unknown>({ path: "/expenses" });
    return ok(data);
  } catch (e: any) {
    return error(e?.status ?? 500, "Failed to fetch expenses", e?.body);
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const created = await bffFetch<unknown>({
      path: "/expenses",
      method: "POST",
      body,
    });

    return ok(created);
  } catch (e: any) {
    console.error("[BFF] POST /api/expenses failed:", e);
    return error(e?.status ?? 500, "Failed to create expense", e);
  }
};
