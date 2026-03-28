import { getDashboardSummary } from "@/src/lib/bff/server";
import { DashboardSummary } from "../types/dashboard";
import Link from "next/link";
import DashboardClient from "./components/DashboardClient";

const Page = async () => {
  const summary = await getDashboardSummary<DashboardSummary>({});

  return (
    <main className="min-h-screen px-10 py-10 animate-fade-up">
      {/* Header */}
      <div className="mb-8 flex items-end justify-between border-b border-slate-200 pb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Overview</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">ダッシュボード</h1>
        </div>
        <Link
          href="/expenses/new"
          className="rounded-xl bg-violet-500 border-2 border-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0px_#94a3b8] hover:-translate-y-1 hover:shadow-[4px_6px_0px_#94a3b8] active:translate-y-0 active:shadow-[3px_3px_0px_#94a3b8] transition-all duration-100"
        >
          ＋ 支出を追加
        </Link>
      </div>

      <DashboardClient summary={summary} />
    </main>
  );
};

export default Page;
