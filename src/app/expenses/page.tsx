import { getExpenses } from "@/src/lib/bff/server";
import ExpensesTable from "./components/ExpensesTable";
import Link from "next/link";
import ExpensesPageClient from "./components/ExpensesPageClient";

type Expense = {
  id: string;
  name: string;
  amount: number;
  billing_cycle: string;
  cancel_suggestion: boolean;
};

const Page = async () => {
  const expenses = await getExpenses<Expense[]>({});
  const totalMonthly = expenses
    .filter((e) => e.billing_cycle === "monthly")
    .reduce((sum, e) => sum + e.amount, 0);
  const cancelCount = expenses.filter((e) => e.cancel_suggestion).length;

  return (
    <main className="min-h-screen px-10 py-10 animate-fade-up">
      <div className="mb-8 flex items-end justify-between border-b border-slate-200 pb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Expenses</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">支出一覧</h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-slate-500">{expenses.length}件</span>
            {cancelCount > 0 && (
              <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-600">
                解約候補 {cancelCount}件
              </span>
            )}
          </div>
        </div>
        <Link
          href="/expenses/new"
          className="rounded-xl bg-violet-500 border-2 border-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0px_#94a3b8] hover:opacity-90 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-100"
        >
          ＋ 支出を追加
        </Link>
      </div>

      <ExpensesPageClient
        totalMonthly={totalMonthly}
        expenseCount={expenses.length}
        cancelCount={cancelCount}
      />

      <ExpensesTable expenses={expenses} />
    </main>
  );
};

export default Page;
