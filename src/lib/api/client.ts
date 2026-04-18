"use client";

import { fetchAuthSession } from "aws-amplify/auth";
import { normalizePath, unwrap } from "./base";

const getAuthHeaders = async (): Promise<Record<string, string>> => {
  try {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();
    if (token) return { Authorization: `Bearer ${token}` };
  } catch {}
  return {};
};

export const apiGet = async <T>(path: string): Promise<T> => {
  const url = normalizePath(path);
  const authHeaders = await getAuthHeaders();
  const res = await fetch(url, { headers: authHeaders, cache: "no-store" });
  return unwrap<T>(res);
};

export const apiPost = async <T>(path: string, body: unknown): Promise<T> => {
  const url = normalizePath(path);
  const authHeaders = await getAuthHeaders();
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  return unwrap<T>(res);
};

export const apiPatch = async <T>(path: string, body: unknown): Promise<T> => {
  const url = normalizePath(path);
  const authHeaders = await getAuthHeaders();
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  return unwrap<T>(res);
};

export const apiDelete = async <T>(path: string): Promise<T> => {
  const url = normalizePath(path);
  const authHeaders = await getAuthHeaders();
  const res = await fetch(url, {
    method: "DELETE",
    headers: authHeaders,
    cache: "no-store",
  });
  return unwrap<T>(res);
};
