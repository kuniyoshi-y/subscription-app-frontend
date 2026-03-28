"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CategoryPie } from "./CategoryPie";
import type { DashboardSummary } from "../../types/dashboard";

type Props = { summary: DashboardSummary };

const StatCard = ({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) => (
  <div
    className="rounded-2xl bg-white border-2 border-slate-900 p-6 shadow-[4px_4px_0px_#94a3b8]"
  >
    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{label}</p>
    <p className="mt-3 text-2xl font-black tabular-nums tracking-tight text-slate-900">{value}</p>
    <p className="mt-1.5 text-xs text-slate-400">{sub}</p>
  </div>
);

const DashboardClient = ({ summary }: Props) => {
  return (
    <>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Monthly Total"
          value={`¥${Math.round(summary.total_monthly).toLocaleString()}`}
          sub="今月の支出合計"
        />
        <StatCard
          label="Yearly Total"
          value={`¥${Math.round(summary.total_yearly).toLocaleString()}`}
          sub="年間換算の支出合計"
        />
        <StatCard
          label="Cancel Candidates"
          value={`${summary.cancel_candidates}件`}
          sub={summary.cancel_candidates > 0 ? "見直しが必要なサービス" : "全サービス利用中"}
        />
      </div>

      {/* Charts + Stats */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl bg-white border-2 border-slate-900 p-6 shadow-[4px_4px_0px_#94a3b8]">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Breakdown</p>
          <h2 className="mt-0.5 text-base font-black tracking-tight text-slate-900 mb-4">カテゴリ別割合</h2>
          <CategoryPie data={summary.by_category} />
        </div>

        <div className="rounded-2xl bg-white border-2 border-slate-900 p-6 shadow-[4px_4px_0px_#94a3b8] flex flex-col">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">Quick Stats</p>
          <h2 className="text-base font-black tracking-tight text-slate-900 mb-4">サマリー</h2>
          <div className="flex-1 divide-y divide-slate-100">
            <div className="flex items-center justify-between py-3.5">
              <span className="text-xs font-semibold text-slate-500">カテゴリ数</span>
              <span className="text-sm font-black text-slate-900">{summary.by_category.length}件</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <span className="text-xs font-semibold text-slate-500">日割り</span>
              <span className="text-sm font-black text-slate-900">
                ¥{Math.round(summary.total_monthly / 30).toLocaleString()}/日
              </span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <span className="text-xs font-semibold text-slate-500">解約候補</span>
              <span className="text-sm font-black text-slate-900">{summary.cancel_candidates}件</span>
            </div>
          </div>
          <Link
            href="/expenses"
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-white border-2 border-slate-900 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-900 shadow-[3px_3px_0px_#94a3b8] hover:opacity-90 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-100"
          >
            一覧を見る →
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashboardClient;
