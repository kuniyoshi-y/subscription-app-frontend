import CreateExpenseClient from "./components/CreateExpenseClient";
import { getCategories } from "@/src/lib/bff/server";
import Link from "next/link";

type Category = { id: number; name: string };

const NewExpensePage = async () => {
  let categories: Category[] = [];
  let categoriesError: string | null = null;

  try {
    categories = await getCategories<Category[]>({});
  } catch (e: any) {
    categoriesError = e?.message ?? "Failed to load categories";
  }

  return (
    <main className="min-h-screen px-8 py-8 animate-fade-up">
      <Link href="/expenses" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors mb-8">
        ← 支出一覧
      </Link>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">New Expense</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-800">支出を追加</h1>
        <p className="mt-1 text-sm text-slate-400">新しいサービス・固定費を登録します</p>
      </div>
      {categoriesError && (
        <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
          <p className="text-sm font-semibold text-rose-600">カテゴリ取得に失敗しました：{categoriesError}</p>
        </div>
      )}
      <div className="mx-auto max-w-xl">
        <CreateExpenseClient categories={categories} />
      </div>
    </main>
  );
};

export default NewExpensePage;
