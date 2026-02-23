"use client";

import { apiDelete, apiPatch, apiPost } from "@/src/lib/api";

type CreateExpenseBody = {
  name: string;
  amount: number;
  billing_cycle: "monthly" | "yearly";
  cancel_suggestion: boolean;
  memo: string | null;
  category_id: number;
};

type UpdateExpenseBody = {
  name: string;
  amount: number;
  billing_cycle: "monthly" | "yearly";
  cancel_suggestion: boolean;
  memo: string | null;
  category_id: number;
};

export const postExpense = async <T>({ body }: { body: CreateExpenseBody }): Promise<T> => {
  return apiPost<T>("/api/expenses", body);
};

export const patchExpense = async <T>({ id, body }: { id: string; body: UpdateExpenseBody }): Promise<T> => {
  return apiPatch<T>(`/api/expenses/${encodeURIComponent(id)}`, body);
};

export const deleteExpense = async <T>({ id }: { id: string }): Promise<T> => {
  return apiDelete<T>(`/api/expenses/${encodeURIComponent(id)}`);
};

export const postCategory = async <T>({ name }: { name: string }): Promise<T> => {
  return apiPost<T>("/api/categories", { name });
};
