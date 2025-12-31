type BffOk<T> = { data: T };
type BffNg = { error: { message: string; detail?: unknown } };
type BffResponse<T> = BffOk<T> | BffNg;

const must = (value: string | undefined, name: string): string => {
  if (!value) throw new Error(`${name} is not set`);
  return value;
};

const toAbsoluteUrl = (path: string): string => {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  // Client Component（ブラウザ）なら相対でOK
  if (typeof window !== "undefined") return path;

  // Server Component（SSR）なら APP_ORIGIN で絶対URLにする
  const origin = must(process.env.APP_ORIGIN, "APP_ORIGIN");
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
  const url = toAbsoluteUrl(path);
  const res = await fetch(url, { cache: "no-store" });
  return unwrap<T>(res);
};

export const apiPatch = async <T>(path: string, body: unknown): Promise<T> => {
  const url = toAbsoluteUrl(path);
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return unwrap<T>(res);
};

export const apiPost = async <T>(path: string, body: unknown): Promise<T> => {
  const url = toAbsoluteUrl(path);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return unwrap<T>(res);
};

export const apiDelete = async <T>(path: string): Promise<T> => {
  const url = toAbsoluteUrl(path);
  const res = await fetch(url, { method: "DELETE" });
  return unwrap<T>(res);
};
