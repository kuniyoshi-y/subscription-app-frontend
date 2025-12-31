"use client";

import { useRouter } from "next/navigation";

type Expense = {
  id: string;
  name: string;
  amount: number;
  billing_cycle: string;
  cancel_suggestion: boolean;
};

const yen = (n: number) => `${Math.round(n).toLocaleString()}円`;

const ExpensesTable = ({ expenses }: { expenses: Expense[] }) => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-zinc-50">
          <tr>
            <th className="p-3 text-left">名前</th>
            <th className="p-3 text-right">金額</th>
            <th className="p-3 text-left">周期</th>
            <th className="p-3 text-left">解約候補</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr
              key={e.id}
              className="border-t cursor-pointer hover:bg-zinc-50"
              onClick={() => router.push(`/expenses/${e.id}`)}
            >
              <td className="p-3">{e.name}</td>
              <td className="p-3 text-right">{yen(e.amount)}</td>
              <td className="p-3">{e.billing_cycle}</td>
              <td className="p-3">{e.cancel_suggestion ? "はい" : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTable;
