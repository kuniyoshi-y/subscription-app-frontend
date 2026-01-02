"use client";

import { normalizePath, unwrap } from "./base";

export const apiGet = async <T>(path: string): Promise<T> => {
  const url = normalizePath(path);
  const res = await fetch(url, { cache: "no-store" });
  return unwrap<T>(res);
};

export const apiPost = async <T>(path: string, body: unknown): Promise<T> => {
  const url = normalizePath(path);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  return unwrap<T>(res);
};

export const apiPatch = async <T>(path: string, body: unknown): Promise<T> => {
  const url = normalizePath(path);
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  return unwrap<T>(res);
};

export const apiDelete = async <T>(path: string): Promise<T> => {
  const url = normalizePath(path);
  const res = await fetch(url, { method: "DELETE", cache: "no-store" });
  return unwrap<T>(res);
};
