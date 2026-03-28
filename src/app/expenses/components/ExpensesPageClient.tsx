"use client";

type Props = {
  totalMonthly: number;
  expenseCount: number;
  cancelCount: number;
};

const yen = (n: number) => `${Math.round(n).toLocaleString()}`;

const ExpensesPageClient = ({ totalMonthly, expenseCount, cancelCount }: Props) => {
  if (expenseCount === 0) return null;

  const stats = [
    { label: "月払い合計", value: `¥${yen(totalMonthly)}` },
    { label: "登録数",     value: `${expenseCount}件` },
    { label: "解約候補",   value: `${cancelCount}件` },
    { label: "日割り",     value: `¥${yen(Math.round(totalMonthly / 30))}` },
  ];

  return (
    <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map(({ label, value }) => (
        <div
          key={label}
          className="rounded-2xl bg-white border-2 border-slate-900 p-4 shadow-[4px_4px_0px_#94a3b8]"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{label}</p>
          <p className="mt-1.5 text-2xl font-black tabular-nums tracking-tight text-slate-900">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default ExpensesPageClient;
