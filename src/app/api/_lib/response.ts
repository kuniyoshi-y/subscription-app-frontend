import { NextResponse } from "next/server";

export const ok = <T>(data: T) => NextResponse.json({ data }, { status: 200 });

export const error = (status: number, message: string, detail?: unknown) =>
  NextResponse.json({ error: { message, detail } }, { status });
