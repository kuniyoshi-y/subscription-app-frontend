import { assertServerEnv, env } from "./env";

type Opt = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;       // FastAPI側のパス: "/expenses" など
  body?: unknown;
};

export const fetchUpstreamJson = async <T>(opt: Opt): Promise<T> => {
  assertServerEnv();

  const base = new URL(env.FASTAPI_BASE_URL);
  const url = new URL(opt.path, base).toString();

  const res = await fetch(url, {
    method: opt.method ?? "GET",
    headers: { "Content-Type": "application/json" },
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
