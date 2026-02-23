"use client";

import { useRouter } from "next/navigation";
import ExpenseForm, {
  Category,
  ExpenseFormValues,
} from "@/src/app/expenses/components/ExpenseForm";
import { ApiError } from "@/src/lib/api";
import { postCategory, postExpense } from "@/src/lib/bff/client";

type Props = {
  categories: Category[];
};

const CreateExpenseClient = ({ categories }: Props) => {
  const router = useRouter();

  const handleSubmit = async (v: ExpenseFormValues) => {
    await postExpense({ body: {
      name: v.name.trim(),
      amount: Number(v.amount),
      billing_cycle: v.billing_cycle,
      cancel_suggestion: v.cancel_suggestion,
      memo: v.memo.trim() ? v.memo : null,
      category_id: Number(v.category_id),
    } });

    router.push("/expenses");
    router.refresh();
  };

  const handleCreateCategory = async (name: string) => {
    try {
      return await postCategory<Category>({ name });
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
      submitLabel="追加"
      onSubmit={handleSubmit}
      enableInlineCategoryCreate
      onCreateCategory={handleCreateCategory}
    />
  );
};

export default CreateExpenseClient;
