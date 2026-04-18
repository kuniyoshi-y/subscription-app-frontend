import "server-only";
import { headers, cookies } from "next/headers";
import { fetchAuthSession } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "@/src/lib/auth/amplify-server-utils";
import { normalizePath, unwrap } from "./base";

const getAuthHeadersOnServer = async (): Promise<Record<string, string>> => {
  try {
    const token = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async (contextSpec) => {
        const session = await fetchAuthSession(contextSpec);
        return session.tokens?.idToken?.toString();
      },
    });
    if (token) return { Authorization: `Bearer ${token}` };
  } catch {}
  return {};
};

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
  const [url, authHeaders] = await Promise.all([
    toAbsoluteUrlOnServer(path),
    getAuthHeadersOnServer(),
  ]);
  const res = await fetch(url, { headers: authHeaders, cache: "no-store" });
  return unwrap<T>(res);
};

export const apiPost = async <T>(path: string, body: unknown): Promise<T> => {
  const [url, authHeaders] = await Promise.all([
    toAbsoluteUrlOnServer(path),
    getAuthHeadersOnServer(),
  ]);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  return unwrap<T>(res);
};

export const apiPatch = async <T>(path: string, body: unknown): Promise<T> => {
  const [url, authHeaders] = await Promise.all([
    toAbsoluteUrlOnServer(path),
    getAuthHeadersOnServer(),
  ]);
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  return unwrap<T>(res);
};

export const apiDelete = async <T>(path: string): Promise<T> => {
  const [url, authHeaders] = await Promise.all([
    toAbsoluteUrlOnServer(path),
    getAuthHeadersOnServer(),
  ]);
  const res = await fetch(url, {
    method: "DELETE",
    headers: authHeaders,
    cache: "no-store",
  });
  return unwrap<T>(res);
};
