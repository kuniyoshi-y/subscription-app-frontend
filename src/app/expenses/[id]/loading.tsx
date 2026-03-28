import Skeleton from "../../components/Skeleton";

const Loading = () => (
  <main className="min-h-screen px-8 py-8 animate-fade-up">
    <div className="h-3 w-20 bg-slate-200 rounded-lg animate-pulse mb-8" />

    {/* Hero */}
    <div className="mb-6 flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-slate-200 animate-pulse shrink-0" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-2.5 w-24" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-9 w-16 rounded-xl bg-slate-200 animate-pulse border-2 border-slate-300 shadow-[3px_3px_0px_#cbd5e1]" />
        <div className="h-9 w-16 rounded-xl bg-slate-200 animate-pulse border-2 border-slate-300 shadow-[3px_3px_0px_#cbd5e1]" />
      </div>
    </div>

    {/* Amount cards */}
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="rounded-2xl bg-white border-2 border-slate-900 p-5 shadow-[4px_4px_0px_#94a3b8] animate-pulse space-y-3">
        <Skeleton className="h-2.5 w-12" />
        <Skeleton className="h-8 w-28" />
      </div>
      <div className="rounded-2xl bg-white border-2 border-slate-900 p-5 shadow-[4px_4px_0px_#94a3b8] animate-pulse space-y-3">
        <Skeleton className="h-2.5 w-12" />
        <Skeleton className="h-8 w-28" />
      </div>
    </div>

    {/* Detail */}
    <div className="rounded-2xl bg-white border-2 border-slate-900 p-6 shadow-[4px_4px_0px_#94a3b8]">
      <Skeleton className="h-2.5 w-16 mb-6" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className={`flex items-center justify-between py-3.5 ${i !== 0 ? "border-t border-slate-100" : ""}`}>
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      ))}
    </div>
  </main>
);

export default Loading;
