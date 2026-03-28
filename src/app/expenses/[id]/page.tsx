import Link from "next/link";
import { getExpense } from "@/src/lib/bff/server";
import DeleteExpenseButton from "./components/DeleteExpenseButton";

type Expense = {
  id: string;
  name: string;
  amount: number;
  billing_cycle: string;
  cancel_suggestion: boolean;
  memo?: string | null;
};

const yen = (n: number) => `${Math.round(n).toLocaleString()}`;

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const expense = await getExpense<Expense>({ id });
  const yearlyAmount =
    expense.billing_cycle === "monthly" ? expense.amount * 12 : expense.amount;

  return (
    <main className="min-h-screen px-8 py-8 animate-fade-up">
      <Link
        href="/expenses"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors mb-8"
      >
        ← 支出一覧
      </Link>

      {/* Hero */}
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white">
            {expense.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-800">{expense.name}</h1>
              {expense.cancel_suggestion && (
                <span className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-600">
                  解約候補
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Expense Detail</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/expenses/${expense.id}/edit`}
            className="rounded-xl bg-white border-2 border-slate-900 px-4 py-2 text-sm font-bold text-slate-900 shadow-[3px_3px_0px_#94a3b8] hover:-translate-y-1 hover:shadow-[4px_6px_0px_#94a3b8] active:translate-y-0 active:shadow-[3px_3px_0px_#94a3b8] transition-all duration-100"
          >
            編集
          </Link>
          <DeleteExpenseButton id={expense.id} />
        </div>
      </div>

      {/* Amount cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-2xl bg-white border-2 border-slate-900 p-5 shadow-[4px_4px_12px_rgba(0,0,0,0.12)]">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            {expense.billing_cycle === "monthly" ? "月額" : "年額"}
          </p>
          <p className="mt-2 text-3xl font-black tabular-nums tracking-tight text-slate-900">
            ¥{yen(expense.amount)}
          </p>
        </div>
        <div className="rounded-2xl bg-white border-2 border-slate-900 p-5 shadow-[4px_4px_12px_rgba(0,0,0,0.12)]">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">年間換算</p>
          <p className="mt-2 text-3xl font-black tabular-nums tracking-tight text-slate-900">
            ¥{yen(yearlyAmount)}
          </p>
        </div>
      </div>

      {/* Detail */}
      <div className="rounded-2xl bg-white border-2 border-slate-900 p-6 shadow-[4px_4px_12px_rgba(0,0,0,0.12)]">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">詳細情報</p>
        <div className="divide-y divide-slate-100">
          <div className="flex items-center justify-between py-3.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">請求周期</span>
            <span className="rounded border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
              {expense.billing_cycle === "monthly" ? "月額" : "年額"}
            </span>
          </div>
          <div className="flex items-center justify-between py-3.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">解約候補</span>
            <span className={`rounded-lg border px-3 py-1 text-xs font-semibold ${
              expense.cancel_suggestion
                ? "border-rose-200 bg-rose-50 text-rose-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}>
              {expense.cancel_suggestion ? "候補" : "対象外"}
            </span>
          </div>
          {expense.memo && (
            <div className="flex items-start justify-between gap-4 py-3.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 shrink-0">メモ</span>
              <span className="text-sm text-slate-600 text-right whitespace-pre-wrap">{expense.memo}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
