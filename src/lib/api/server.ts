import "server-only";
import { headers } from "next/headers";
import { normalizePath, unwrap } from "./base";

const toAbsoluteUrlOnServer = async (path: string): Promise<string> => {
  const p = normalizePath(path);
  if (p.startsWith("http")) return p;

  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("host");
  if (!host) throw new Error("HOST header is missing");

  return new URL(p, `${proto}://${host}`).toString();
};

export const apiGet = async <T>(path: string): Promise<T> => {
  const url = await toAbsoluteUrlOnServer(path);
  const res = await fetch(url, { cache: "no-store" });
  return unwrap<T>(res);
};

export const apiPost = async <T>(path: string, body: unknown): Promise<T> => {
  const url = await toAbsoluteUrlOnServer(path);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  return unwrap<T>(res);
};

export const apiPatch = async <T>(path: string, body: unknown): Promise<T> => {
  const url = await toAbsoluteUrlOnServer(path);
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  return unwrap<T>(res);
};

export const apiDelete = async <T>(path: string): Promise<T> => {
  const url = await toAbsoluteUrlOnServer(path);
  const res = await fetch(url, { method: "DELETE", cache: "no-store" });
  return unwrap<T>(res);
};
