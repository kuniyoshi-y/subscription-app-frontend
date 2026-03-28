"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CategoryPie } from "./CategoryPie";
import CountUp from "./CountUp";
import type { DashboardSummary } from "../../types/dashboard";

type Props = { summary: DashboardSummary };

const StatCard = ({
  label,
  value,
  sub,
  delay,
}: {
  label: string;
  value: React.ReactNode;
  sub: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: "easeOut" }}
    className="rounded-2xl bg-white border-2 border-slate-900 p-6 shadow-[4px_4px_12px_rgba(0,0,0,0.12)]"
  >
    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{label}</p>
    <p className="mt-3 text-2xl font-black tabular-nums tracking-tight text-slate-900">{value}</p>
    <p className="mt-1.5 text-xs text-slate-400">{sub}</p>
  </motion.div>
);

const DashboardClient = ({ summary }: Props) => {
  return (
    <>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Monthly Total"
          value={<CountUp value={Math.round(summary.total_monthly)} prefix="¥" duration={1000} />}
          sub="今月の支出合計"
          delay={0.05}
        />
        <StatCard
          label="Yearly Total"
          value={<CountUp value={Math.round(summary.total_yearly)} prefix="¥" duration={1200} />}
          sub="年間換算の支出合計"
          delay={0.15}
        />
        <StatCard
          label="Cancel Candidates"
          value={<CountUp value={summary.cancel_candidates} suffix="件" duration={800} />}
          sub={summary.cancel_candidates > 0 ? "見直しが必要なサービス" : "全サービス利用中"}
          delay={0.25}
        />
      </div>

      {/* Charts + Stats */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="lg:col-span-2 rounded-2xl bg-white border-2 border-slate-900 p-6 shadow-[4px_4px_12px_rgba(0,0,0,0.12)]"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Breakdown</p>
          <h2 className="mt-0.5 text-base font-black tracking-tight text-slate-900 mb-4">カテゴリ別割合</h2>
          <CategoryPie data={summary.by_category} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="rounded-2xl bg-white border-2 border-slate-900 p-6 shadow-[4px_4px_12px_rgba(0,0,0,0.12)] flex flex-col"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">Quick Stats</p>
          <h2 className="text-base font-black tracking-tight text-slate-900 mb-4">サマリー</h2>
          <div className="flex-1 divide-y divide-slate-100">
            <div className="flex items-center justify-between py-3.5">
              <span className="text-xs font-semibold text-slate-500">カテゴリ数</span>
              <span className="text-sm font-black text-slate-900">
                <CountUp value={summary.by_category.length} suffix="件" duration={800} />
              </span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <span className="text-xs font-semibold text-slate-500">日割り</span>
              <span className="text-sm font-black text-slate-900">
                ¥<CountUp value={Math.round(summary.total_monthly / 30)} duration={1000} />/日
              </span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <span className="text-xs font-semibold text-slate-500">解約候補</span>
              <span className="text-sm font-black text-slate-900">
                <CountUp value={summary.cancel_candidates} suffix="件" duration={800} />
              </span>
            </div>
          </div>
          <Link
            href="/expenses"
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-white border-2 border-slate-900 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-900 shadow-[3px_3px_0px_#94a3b8] hover:-translate-y-1 hover:shadow-[3px_6px_0px_#94a3b8] active:translate-y-0 active:shadow-[3px_3px_0px_#94a3b8] transition-all duration-150"
          >
            一覧を見る →
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default DashboardClient;
