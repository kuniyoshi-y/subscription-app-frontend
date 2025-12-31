import Link from "next/link";
import { apiGet } from "../../../lib/api";
import DeleteExpenseButton from "./components/DeleteExpenseButton";

type Expense = {
  id: string;
  name: string;
  amount: number;
  billing_cycle: string;
  cancel_suggestion: boolean;
  memo?: string | null;
};

const yen = (n: number) => `${Math.round(n).toLocaleString()}円`;

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const expense = await apiGet<Expense>(`/api/expenses/${id}`);

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">支出詳細</h1>

        <Link
          href={`/expenses/${expense.id}/edit`}
          className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          編集
        </Link>
        <DeleteExpenseButton id={expense.id} />
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 space-y-2">
        <div className="text-sm text-zinc-500">名前</div>
        <div className="text-lg font-semibold">{expense.name}</div>

        <div className="mt-3 text-sm text-zinc-500">金額</div>
        <div className="text-lg font-semibold">{yen(expense.amount)}</div>

        <div className="mt-3 text-sm text-zinc-500">周期</div>
        <div className="text-base">{expense.billing_cycle}</div>

        <div className="mt-3 text-sm text-zinc-500">解約候補</div>
        <div className="text-base">{expense.cancel_suggestion ? "はい" : "いいえ"}</div>
      </div>

      <Link href="/expenses" className="text-sm text-zinc-600 hover:underline">
        ← 一覧へ戻る
      </Link>
    </main>
  );
};

export default Page;
