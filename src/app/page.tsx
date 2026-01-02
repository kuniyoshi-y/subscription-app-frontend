import { CategoryPie } from "./components/CategoryPie";
import { apiGet } from "@/src/lib/api/server";
import { DashboardSummary } from "../types/dashboard";

const yen = (n: number) => `${Math.round(n).toLocaleString()}円`;

const Page = async () => {
  const summary = await apiGet<DashboardSummary>("/api/dashboard/summary");

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold">ダッシュボード</h1>

      <section className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-sm text-zinc-500">月額合計</div>
          <div className="mt-1 text-2xl font-bold">{yen(summary.total_monthly)}</div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-sm text-zinc-500">年額合計</div>
          <div className="mt-1 text-2xl font-bold">{yen(summary.total_yearly)}</div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-sm text-zinc-500">解約候補</div>
          <div className="mt-1 text-2xl font-bold">
            <span className={summary.cancel_candidates > 0 ? "text-red-600" : ""}>
              {summary.cancel_candidates}件
            </span>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
        <h2 className="text-lg font-bold">カテゴリ別割合（月額換算）</h2>
        <div className="mt-3">
          <CategoryPie data={summary.by_category} />
        </div>
      </section>
    </main>
  );
};

export default Page;
