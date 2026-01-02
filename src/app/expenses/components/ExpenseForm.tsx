"use client";

import { useMemo, useState } from "react";

export type Category = { id: number; name: string };

export type ExpenseFormValues = {
  name: string;
  amount: string; // UIでは文字列で保持（inputの都合）
  billing_cycle: "monthly" | "yearly";
  category_id: string; // selectの都合で文字列
  cancel_suggestion: boolean;
  memo: string;
};

type Props = {
  categories: Category[];
  defaultValues?: Partial<ExpenseFormValues>;
  submitLabel: string;
  onSubmit: (values: ExpenseFormValues) => Promise<void>;

  // 任意：カテゴリの追加を有効化したい場合
  enableInlineCategoryCreate?: boolean;
  onCreateCategory?: (name: string) => Promise<Category>;
};

const ExpenseForm = ({
  categories,
  defaultValues,
  submitLabel,
  onSubmit,
  enableInlineCategoryCreate = false,
  onCreateCategory,
}: Props) => {
  const [categoryList, setCategoryList] = useState<Category[]>(categories);

  const [name, setName] = useState(defaultValues?.name ?? "");
  const [amount, setAmount] = useState(defaultValues?.amount ?? "");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    defaultValues?.billing_cycle ?? "monthly"
  );
  const [categoryId, setCategoryId] = useState(defaultValues?.category_id ?? "");
  const [cancelSuggestion, setCancelSuggestion] = useState(
    defaultValues?.cancel_suggestion ?? false
  );
  const [memo, setMemo] = useState(defaultValues?.memo ?? "");

  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // 新規カテゴリ作成（UIだけ共通に持たせたいならここでOK）
  const [newCategoryName, setNewCategoryName] = useState("");
  const [creatingCategory, setCreatingCategory] = useState(false);

  const canSave = useMemo(() => {
    if (!name.trim()) return false;

    const n = Number(amount);
    if (!Number.isFinite(n) || n < 0) return false;

    const cid = Number(categoryId);
    if (!Number.isFinite(cid) || cid <= 0) return false;

    return true;
  }, [name, amount, categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!canSave) return;

    setSaving(true);
    try {
      await onSubmit({
        name,
        amount,
        billing_cycle: billingCycle,
        category_id: categoryId,
        cancel_suggestion: cancelSuggestion,
        memo,
      });
    } catch (e: any) {
      setErr(e?.message ?? "保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateCategory = async () => {
    if (!enableInlineCategoryCreate) return;
    if (!onCreateCategory) {
      setErr("カテゴリ追加処理が未設定です");
      return;
    }

    setErr(null);

    const raw = newCategoryName.trim();
    if (!raw) {
      setErr("カテゴリ名を入力してください");
      return;
    }

    const exists = categoryList.some((c) => c.name.toLowerCase() === raw.toLowerCase());
    if (exists) {
      setErr("同名のカテゴリが既にあります");
      return;
    }

    setCreatingCategory(true);
    try {
      const created = await onCreateCategory(raw);
      setCategoryList((prev) => [...prev, created]);
      setCategoryId(String(created.id));
      setNewCategoryName("");
    } catch (e: any) {
      setErr(e?.message ?? "カテゴリ追加に失敗しました");
    } finally {
      setCreatingCategory(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-zinc-200 bg-white p-4 space-y-4"
    >
      <div>
        <label className="text-sm font-medium">名前</label>
        <input
          className="mt-1 w-full rounded-lg border border-zinc-200 p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Netflix"
        />
      </div>

      <div>
        <label className="text-sm font-medium">金額</label>
        <input
          className="mt-1 w-full rounded-lg border border-zinc-200 p-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputMode="numeric"
          placeholder="990"
        />
      </div>

      <div>
        <label className="text-sm font-medium">請求周期</label>
        <select
          className="mt-1 w-full rounded-lg border border-zinc-200 p-2"
          value={billingCycle}
          onChange={(e) => setBillingCycle(e.target.value as "monthly" | "yearly")}
        >
          <option value="monthly">monthly</option>
          <option value="yearly">yearly</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">カテゴリ</label>
        <select
          className="mt-1 w-full rounded-lg border border-zinc-200 p-2"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={categoryList.length === 0 && creatingCategory}
        >
          <option value="">選択してください</option>
          {categoryList.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {enableInlineCategoryCreate ? (
        <div className="rounded-lg border border-zinc-200 p-3">
          <p className="text-sm font-medium">新しいカテゴリを追加</p>
          <div className="mt-2 flex gap-2">
            <input
              className="w-full rounded-lg border border-zinc-200 p-2 text-sm"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="例：動画 / サブスク / 光熱費"
            />
            <button
              type="button"
              onClick={handleCreateCategory}
              disabled={creatingCategory}
              className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              {creatingCategory ? "追加中..." : "追加"}
            </button>
          </div>
          <p className="mt-2 text-xs text-zinc-500">追加後は自動で選択されます。</p>
        </div>
      ) : null}

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={cancelSuggestion}
          onChange={(e) => setCancelSuggestion(e.target.checked)}
        />
        解約候補
      </label>

      <div>
        <label className="text-sm font-medium">メモ</label>
        <textarea
          className="mt-1 w-full rounded-lg border border-zinc-200 p-2"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          rows={3}
        />
      </div>

      {err ? <p className="text-sm text-red-600">{err}</p> : null}

      <button
        type="submit"
        disabled={!canSave || saving}
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {saving ? "保存中..." : submitLabel}
      </button>
    </form>
  );
};

export default ExpenseForm;
