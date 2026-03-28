"use client";

import { useMemo, useState } from "react";

export type Category = { id: number; name: string };

export type ExpenseFormValues = {
  name: string;
  amount: string;
  billing_cycle: "monthly" | "yearly";
  category_id: string;
  cancel_suggestion: boolean;
  memo: string;
};

type Props = {
  categories: Category[];
  defaultValues?: Partial<ExpenseFormValues>;
  submitLabel: string;
  onSubmit: (values: ExpenseFormValues) => Promise<void>;
  enableInlineCategoryCreate?: boolean;
  onCreateCategory?: (name: string) => Promise<Category>;
};

const inputClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-300 focus:border-slate-400 transition-colors";

const labelClass = "block text-xs font-semibold text-slate-500";

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
      await onSubmit({ name, amount, billing_cycle: billingCycle, category_id: categoryId, cancel_suggestion: cancelSuggestion, memo });
    } catch (e: any) {
      setErr(e?.message ?? "保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateCategory = async () => {
    if (!enableInlineCategoryCreate || !onCreateCategory) return;
    setErr(null);
    const raw = newCategoryName.trim();
    if (!raw) { setErr("カテゴリ名を入力してください"); return; }
    if (categoryList.some((c) => c.name.toLowerCase() === raw.toLowerCase())) {
      setErr("同名のカテゴリが既にあります"); return;
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
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 基本情報 */}
      <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_12px_rgba(0,0,0,0.12)] space-y-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">基本情報</p>

        <div>
          <label className={labelClass}>サービス名</label>
          <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="例：Netflix、家賃" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>金額</label>
            <div className="relative mt-1.5">
              <input
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-9 text-sm text-slate-800 placeholder:text-slate-300 focus:border-violet-400 transition-colors"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                inputMode="numeric"
                placeholder="990"
              />
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400">円</span>
            </div>
          </div>
          <div>
            <label className={labelClass}>請求周期</label>
            <select className={inputClass} value={billingCycle} onChange={(e) => setBillingCycle(e.target.value as "monthly" | "yearly")}>
              <option value="monthly">月額</option>
              <option value="yearly">年額</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>カテゴリ</label>
          <select className={inputClass} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">選択してください</option>
            {categoryList.map((c) => (
              <option key={c.id} value={String(c.id)}>{c.name}</option>
            ))}
          </select>
        </div>

        {enableInlineCategoryCreate && (
          <div className="rounded border border-dashed border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-400 mb-2">新しいカテゴリを追加</p>
            <div className="flex gap-2">
              <input
                className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-300 focus:border-slate-400 transition-colors"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="例：動画、光熱費"
              />
              <button
                type="button"
                onClick={handleCreateCategory}
                disabled={creatingCategory}
                className="shrink-0 rounded-lg bg-violet-500 border-2 border-slate-900 px-4 py-2 text-xs font-bold text-white shadow-[2px_2px_0px_#94a3b8] hover:-translate-y-0.5 hover:shadow-[3px_5px_0px_#94a3b8] active:translate-y-0 active:shadow-[2px_2px_0px_#94a3b8] disabled:opacity-40 transition-all duration-100"
              >
                {creatingCategory ? "追加中..." : "追加"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* オプション */}
      <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_12px_rgba(0,0,0,0.12)] space-y-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">オプション</p>

        <label className="flex cursor-pointer items-center gap-3 rounded border border-slate-200 px-4 py-3 hover:bg-slate-50 transition-colors">
          <div className="relative shrink-0">
            <input type="checkbox" className="sr-only" checked={cancelSuggestion} onChange={(e) => setCancelSuggestion(e.target.checked)} />
            <div className={`h-5 w-5 rounded border-2 transition-all ${
              cancelSuggestion ? "border-rose-500 bg-rose-500" : "border-slate-300 bg-white"
            }`}>
              {cancelSuggestion && (
                <svg className="h-full w-full text-white p-0.5" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">解約候補にする</p>
            <p className="text-xs text-slate-400">見直しが必要なサービスにマーク</p>
          </div>
        </label>

        <div>
          <label className={labelClass}>メモ</label>
          <textarea className={`${inputClass} resize-none`} value={memo} onChange={(e) => setMemo(e.target.value)} rows={3} placeholder="備考・契約内容など" />
        </div>
      </div>

      {err && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
          <p className="text-sm font-semibold text-rose-600">{err}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!canSave || saving}
        className="w-full rounded-xl bg-violet-500 border-2 border-slate-900 py-3 text-sm font-bold text-white shadow-[3px_3px_0px_#94a3b8] hover:-translate-y-1 hover:shadow-[4px_6px_0px_#94a3b8] active:translate-y-0 active:shadow-[3px_3px_0px_#94a3b8] disabled:opacity-40 disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:active:shadow-[3px_3px_0px_#94a3b8] transition-all duration-100"
      >
        {saving ? "保存中..." : submitLabel}
      </button>
    </form>
  );
};

export default ExpenseForm;
