import CreateExpenseClient from "./components/CreateExpenseClient";
import { getCategories } from "@/src/lib/bff/server";

type Category = { id: number; name: string };

const NewExpensePage = async () => {
  let categories: Category[] = [];
  let categoriesError: string | null = null;

  try {
    categories = await getCategories<Category[]>({});
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
};

export default NewExpensePage;
