import { getExpense, getCategories } from "@/src/lib/bff/server";
import EditExpenseClient from "./components/EditExpenseClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

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

  // 並列取得（SSR最短）
  const [expense, categories] = await Promise.all([
    getExpense<Expense>({ id }),
    getCategories<Category[]>({}),
  ]);

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">支出を編集</h1>

      <EditExpenseClient id={id} expense={expense} categories={categories} />
    </div>
  );
};

export default EditExpensePage;