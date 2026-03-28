"use client";

import CountUp from "../../components/CountUp";

type Props = {
  totalMonthly: number;
  expenseCount: number;
  cancelCount: number;
};

const ExpensesPageClient = ({ totalMonthly, expenseCount, cancelCount }: Props) => {
  if (expenseCount === 0) return null;

  const daily = Math.round(totalMonthly / 30);

  return (
    <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div className="rounded-2xl bg-white border-2 border-slate-900 p-4 shadow-[4px_4px_12px_rgba(0,0,0,0.12)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">月払い合計</p>
        <p className="mt-1.5 text-2xl font-black tabular-nums tracking-tight text-slate-900">
          ¥<CountUp value={totalMonthly} duration={1000} />
        </p>
      </div>
      <div className="rounded-2xl bg-white border-2 border-slate-900 p-4 shadow-[4px_4px_12px_rgba(0,0,0,0.12)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">登録数</p>
        <p className="mt-1.5 text-2xl font-black tabular-nums tracking-tight text-slate-900">
          <CountUp value={expenseCount} suffix="件" duration={800} />
        </p>
      </div>
      <div className="rounded-2xl bg-white border-2 border-slate-900 p-4 shadow-[4px_4px_12px_rgba(0,0,0,0.12)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">解約候補</p>
        <p className="mt-1.5 text-2xl font-black tabular-nums tracking-tight text-slate-900">
          <CountUp value={cancelCount} suffix="件" duration={800} />
        </p>
      </div>
      <div className="rounded-2xl bg-white border-2 border-slate-900 p-4 shadow-[4px_4px_12px_rgba(0,0,0,0.12)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">日割り</p>
        <p className="mt-1.5 text-2xl font-black tabular-nums tracking-tight text-slate-900">
          ¥<CountUp value={daily} duration={1000} />
        </p>
      </div>
    </div>
  );
};

export default ExpensesPageClient;
