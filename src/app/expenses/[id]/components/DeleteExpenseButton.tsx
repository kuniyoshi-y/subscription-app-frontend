"use client";

import { apiDelete } from "@/src/lib/api";
import { useRouter } from "next/navigation";

const DeleteExpenseButton = ({ id }: { id: string }) => {
  const router = useRouter();

  const onDelete = async () => {
    const ok = window.confirm("この支出を削除します。よろしいですか？");
    if (!ok) return;

    try {
      await apiDelete<unknown>(`/api/expenses/${encodeURIComponent(id)}`);

      router.push("/expenses");
      router.refresh();
    } catch (e: any) {
      alert(e?.message ?? "削除に失敗しました");
    }
  };

  return (
    <button
      type="button"
      onClick={onDelete}
      className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
    >
      削除
    </button>
  );
};

export default DeleteExpenseButton;
