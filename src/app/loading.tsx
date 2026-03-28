import { SkeletonCard, SkeletonPageHeader } from "./components/Skeleton";

const Loading = () => (
  <main className="min-h-screen px-10 py-10">
    <SkeletonPageHeader label="Overview" title="ダッシュボード" />

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>

    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 rounded-2xl bg-white border-2 border-slate-900 p-6 shadow-[4px_4px_12px_rgba(0,0,0,0.12)]">
        <div className="animate-pulse space-y-4">
          <div className="h-2.5 w-20 bg-slate-200 rounded-lg" />
          <div className="h-4 w-32 bg-slate-200 rounded-lg" />
          <div className="h-[260px] bg-slate-100 rounded-2xl mt-4" />
        </div>
      </div>
      <div className="rounded-2xl bg-white border-2 border-slate-900 p-6 shadow-[4px_4px_12px_rgba(0,0,0,0.12)]">
        <div className="animate-pulse space-y-3">
          <div className="h-2.5 w-20 bg-slate-200 rounded-lg" />
          <div className="h-4 w-24 bg-slate-200 rounded-lg mb-6" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between items-center py-3.5 border-t border-slate-100">
              <div className="h-3 w-20 bg-slate-200 rounded-lg" />
              <div className="h-3 w-12 bg-slate-200 rounded-lg" />
            </div>
          ))}
          <div className="h-10 w-full bg-slate-100 rounded-xl mt-4" />
        </div>
      </div>
    </div>
  </main>
);

export default Loading;
