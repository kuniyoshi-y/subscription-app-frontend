import "server-only";
import { apiGet } from "@/src/lib/api/server";

type NoArgs = Record<string, never>;

export const getDashboardSummary = async <T>(_arg: NoArgs = {}): Promise<T> => {
  return apiGet<T>("/api/dashboard/summary");
};

export const getExpenses = async <T>(_arg: NoArgs = {}): Promise<T> => {
  return apiGet<T>("/api/expenses");
};

export const getCategories = async <T>(_arg: NoArgs = {}): Promise<T> => {
  return apiGet<T>("/api/categories");
};

export const getExpense = async <T>({ id }: { id: string }): Promise<T> => {
  return apiGet<T>(`/api/expenses/${encodeURIComponent(id)}`);
};
