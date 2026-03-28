import Skeleton from "../../components/Skeleton";

const Loading = () => (
  <main className="min-h-screen px-8 py-8 animate-fade-up">
    <div className="h-3 w-20 bg-slate-200 rounded-lg animate-pulse mb-8" />
    <div className="mb-6 space-y-2">
      <Skeleton className="h-2.5 w-24" />
      <Skeleton className="h-7 w-32" />
      <Skeleton className="h-3 w-48" />
    </div>
    <div className="mx-auto max-w-xl space-y-4">
      <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_#94a3b8] space-y-5 animate-pulse">
        <Skeleton className="h-2.5 w-16" />
        <div className="space-y-1.5">
          <Skeleton className="h-2.5 w-20" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Skeleton className="h-2.5 w-12" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-2.5 w-16" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Skeleton className="h-2.5 w-16" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>
      <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_#94a3b8] space-y-4 animate-pulse">
        <Skeleton className="h-2.5 w-16" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <div className="space-y-1.5">
          <Skeleton className="h-2.5 w-10" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
      </div>
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  </main>
);

export default Loading;
