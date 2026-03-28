"use client";

import { deleteExpense } from "@/src/lib/bff/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteExpenseButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    const ok = window.confirm("この支出を削除しますか？\nこの操作は取り消せません。");
    if (!ok) return;
    setLoading(true);
    try {
      await deleteExpense<unknown>({ id });
      router.push("/expenses");
      router.refresh();
    } catch (e: any) {
      alert(e?.message ?? "削除に失敗しました");
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={loading}
      className="rounded-2xl border-2 border-rose-200 bg-white px-4 py-2 text-sm font-bold text-rose-500 hover:bg-rose-50 hover:border-rose-300 disabled:opacity-40 transition-colors shadow-sm"
    >
      {loading ? "削除中..." : "削除"}
    </button>
  );
};

export default DeleteExpenseButton;
