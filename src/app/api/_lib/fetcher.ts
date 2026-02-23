import { getServerEnv } from "./env";

type BffFetchOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  path: string; // FastAPI側のパス: "/expenses" など
  body?: unknown;
  headers?: Record<string, string>;
};

export const bffFetch = async <T>(opt: BffFetchOptions): Promise<T> => {
  const { FASTAPI_BASE_URL } = getServerEnv();

  const base = new URL(FASTAPI_BASE_URL);
  const url = new URL(opt.path, base).toString();

  const res = await fetch(url, {
    method: opt.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(opt.headers ?? {}),
    },
    body: opt.body ? JSON.stringify(opt.body) : undefined,
    cache: "no-store",
  });

  const text = await res.text();
  const json = text ? JSON.parse(text) : null;

  if (!res.ok) {
    // ひとまず status と body を投げる（後で整える）
    throw { status: res.status, body: json };
  }

  return json as T;
};
