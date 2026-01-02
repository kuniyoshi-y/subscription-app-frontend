import CreateExpenseClient from "./components/CreateExpenseClient";
import { apiGet } from "@/src/lib//api/server";

type Category = { id: number; name: string };

export default async function NewExpensePage() {
  let categories: Category[] = [];
  let categoriesError: string | null = null;

  try {
    categories = await apiGet<Category[]>("/api/categories");
  } catch (e: any) {
    categoriesError = e?.message ?? "Failed to load categories";
    categories = [];
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-xl font-semibold">支出を追加</h1>

      {categoriesError ? (
        <p className="mt-2 text-sm text-red-600">
          カテゴリ取得に失敗しました：{categoriesError}
        </p>
      ) : null}

      <div className="mt-6">
        <CreateExpenseClient categories={categories} />
      </div>
    </div>
  );
}
