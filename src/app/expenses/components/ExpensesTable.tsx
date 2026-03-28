"use client";

import { useRouter } from "next/navigation";

type Expense = {
  id: string;
  name: string;
  amount: number;
  billing_cycle: string;
  cancel_suggestion: boolean;
};

const yen = (n: number) => `${Math.round(n).toLocaleString()}`;

const avatarColors = [
  "bg-slate-900",
  "bg-slate-700",
  "bg-slate-600",
  "bg-slate-500",
  "bg-slate-800",
  "bg-slate-900",
];

const ExpensesTable = ({ expenses }: { expenses: Expense[] }) => {
  const router = useRouter();

  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <span className="text-xl font-bold text-slate-300">?</span>
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-400">まだ登録がありません</p>
        <p className="mt-1 text-xs text-slate-300">「＋ 支出を追加」から登録してください</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white border-2 border-slate-900 shadow-[4px_4px_0px_#94a3b8]">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50">
            <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              サービス名
            </th>
            <th className="px-5 py-3.5 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              金額
            </th>
            <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              周期
            </th>
            <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              ステータス
            </th>
            <th className="px-5 py-3.5" />
          </tr>
        </thead>
        <tbody>
          {expenses.map((e, i) => {
            const avatarBg = avatarColors[i % avatarColors.length];
            return (
              <tr
                key={e.id}
                className={`group cursor-pointer transition-colors hover:bg-slate-50 ${
                  i !== 0 ? "border-t border-slate-100" : ""
                }`}
                onClick={() => router.push(`/expenses/${e.id}`)}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${avatarBg}`}>
                      {e.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-slate-800">{e.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-right">
                  <span className="text-sm font-black tabular-nums text-slate-900">
                    ¥{yen(e.amount)}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                    {e.billing_cycle === "monthly" ? "月額" : e.billing_cycle === "yearly" ? "年額" : e.billing_cycle}
                  </span>
                </td>
                <td className="px-5 py-4">
                  {e.cancel_suggestion ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                      解約候補
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      利用中
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-right">
                  <span className="text-slate-300 transition-colors group-hover:text-slate-700 font-bold">
                    →
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTable;
