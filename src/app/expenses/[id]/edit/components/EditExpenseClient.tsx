"use client";

import { useRouter } from "next/navigation";
import ExpenseForm, {
  Category,
  ExpenseFormValues,
} from "@/src/app/expenses/components/ExpenseForm";
import { apiPatch, apiPost, ApiError } from "@/src/lib/api";

type Expense = {
  id: string;
  name: string;
  amount: number;
  billing_cycle: "monthly" | "yearly";
  cancel_suggestion: boolean;
  memo?: string | null;
  category_id: number | null;
};

type Props = {
  id: string;
  expense: Expense;
  categories: Category[];
};

const EditExpenseClient = ({ id, expense, categories }: Props) => {
  const router = useRouter();

  const handleSubmit = async (v: ExpenseFormValues) => {
    await apiPatch(`/api/expenses/${encodeURIComponent(id)}`, {
      name: v.name.trim(),
      amount: Number(v.amount),
      billing_cycle: v.billing_cycle,
      cancel_suggestion: v.cancel_suggestion,
      memo: v.memo.trim() ? v.memo : null,
      category_id: Number(v.category_id),
    });

    router.push(`/expenses/${id}`);
    router.refresh();
  };

  const handleCreateCategory = async (name: string) => {
    try {
      return await apiPost<Category>("/api/categories", { name });
    } catch (e) {
      if (e instanceof ApiError && e.status === 409) {
        throw new Error("同名のカテゴリが既にあります");
      }
      throw e;
    }
  };

  return (
    <ExpenseForm
      categories={categories}
      defaultValues={{
        name: expense.name ?? "",
        amount: String(expense.amount ?? ""),
        billing_cycle: expense.billing_cycle ?? "monthly",
        category_id: expense.category_id ? String(expense.category_id) : "",
        cancel_suggestion: !!expense.cancel_suggestion,
        memo: expense.memo ?? "",
      }}
      submitLabel="保存"
      onSubmit={handleSubmit}
      enableInlineCategoryCreate
      onCreateCategory={handleCreateCategory}
    />
  );
};

export default EditExpenseClient;
