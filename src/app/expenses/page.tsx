import { apiGet } from "@/src/lib/api";
import ExpensesTable from "./components/ExpensesTable";
import Link from "next/link";

type Expense = {
  id: string;
  name: string;
  amount: number;
  billing_cycle: string;
  cancel_suggestion: boolean;
};

const Page = async () => {
  const expenses = await apiGet<Expense[]>("/api/expenses");

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold">支出一覧</h1>
      <Link
        href="/expenses/new"
        className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800"
      >
        追加
      </Link>
      <div className="mt-4">
        <ExpensesTable expenses={expenses} />
      </div>
    </main>
  );
};

export default Page;
