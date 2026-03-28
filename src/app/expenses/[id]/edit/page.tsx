import { getExpense, getCategories } from "@/src/lib/bff/server";
import EditExpenseClient from "./components/EditExpenseClient";
import Link from "next/link";

type PageProps = { params: Promise<{ id: string }> };
type Category = { id: number; name: string };
type Expense = {
  id: string;
  name: string;
  amount: number;
  billing_cycle: "monthly" | "yearly";
  cancel_suggestion: boolean;
  memo?: string | null;
  category_id: number | null;
};

const EditExpensePage = async ({ params }: PageProps) => {
  const { id } = await params;
  const [expense, categories] = await Promise.all([
    getExpense<Expense>({ id }),
    getCategories<Category[]>({}),
  ]);

  return (
    <main className="min-h-screen px-8 py-8 animate-fade-up">
      <Link href={`/expenses/${id}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors mb-8">
        ← 詳細へ戻る
      </Link>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Edit</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-800">支出を編集</h1>
        <p className="mt-1 text-sm text-slate-400">{expense.name}</p>
      </div>
      <div className="mx-auto max-w-xl">
        <EditExpenseClient id={id} expense={expense} categories={categories} />
      </div>
    </main>
  );
};

export default EditExpensePage;
