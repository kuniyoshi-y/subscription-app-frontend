export type BffOk<T> = { data: T };
export type BffNg = { error: { message: string; detail?: unknown } };
export type BffResponse<T> = BffOk<T> | BffNg;

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

export const pickStatus = (res: Response, detail: unknown): number => {
  if (detail && typeof detail === "object" && "status" in detail) {
    const s = (detail as any).status;
    if (typeof s === "number") return s;
  }
  return res.status;
};

export const unwrap = async <T>(res: Response): Promise<T> => {
  const json = (await res.json()) as BffResponse<T>;

  if (!res.ok || "error" in json) {
    const message = "error" in json ? json.error.message : "API request failed";
    const detail = "error" in json ? json.error.detail : undefined;
    const status = pickStatus(res, detail);
    throw new ApiError(message, status, detail);
  }

  return json.data;
};

export const normalizePath = (path: string): string => {
  if (path.startsWith("http")) return path;
  if (path.startsWith("/")) return path;
  return `/${path}`;
};
