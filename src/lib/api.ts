import { headers } from "next/headers";

type BffOk<T> = { data: T };
type BffNg = { error: { message: string; detail?: unknown } };
type BffResponse<T> = BffOk<T> | BffNg;

const toAbsoluteUrl = async (path: string): Promise<string> => {
  if (path.startsWith("http")) return path;

  // browser（相対URLのままでOK）
  if (typeof window !== "undefined") return path;

  // SSR
  const headersList = await headers();
  const proto = headersList.get("x-forwarded-proto") ?? "https";
  const host = headersList.get("host");

  if (!host) {
    // host が取れない = 環境が壊れてる/想定外
    throw new Error("HOST header is missing");
  }

  const origin = `${proto}://${host}`;
  return new URL(path, origin).toString();
};

// API用のエラー（status など持てる）
export class ApiError extends Error {
  status?: number;
  detail?: unknown;

  constructor(message: string, status?: number, detail?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

// BFF error.detail の中から status を拾う
const pickStatus = (res: Response, detail: unknown): number => {
  // 例: { status: 409, body: ... } のような形を想定
  if (detail && typeof detail === "object" && "status" in detail) {
    const s = (detail as any).status;
    if (typeof s === "number") return s;
  }
  return res.status;
};

const unwrap = async <T>(res: Response): Promise<T> => {
  const json = (await res.json()) as BffResponse<T>;

  if (!res.ok || "error" in json) {
    const message = "error" in json ? json.error.message : "API request failed";
    const detail = "error" in json ? json.error.detail : undefined;
    const status = pickStatus(res, detail);
    throw new ApiError(message, status, detail);
  }

  return json.data;
};

export const apiGet = async <T>(path: string): Promise<T> => {
  const url = await toAbsoluteUrl(path);
  const res = await fetch(url, { cache: "no-store" });
  return unwrap<T>(res);
};

export const apiPatch = async <T>(path: string, body: unknown): Promise<T> => {
  const url = await toAbsoluteUrl(path);
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return unwrap<T>(res);
};

export const apiPost = async <T>(path: string, body: unknown): Promise<T> => {
  const url = await toAbsoluteUrl(path);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return unwrap<T>(res);
};

export const apiDelete = async <T>(path: string): Promise<T> => {
  const url = await toAbsoluteUrl(path);
  const res = await fetch(url, { method: "DELETE" });
  return unwrap<T>(res);
};
