const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-200 rounded-lg ${className ?? ""}`} />
);

export const SkeletonCard = ({ className }: { className?: string }) => (
  <div className={`rounded-2xl bg-white border-2 border-slate-900 p-6 shadow-[4px_4px_0px_#94a3b8] ${className ?? ""}`}>
    <Skeleton className="h-2.5 w-20 mb-4" />
    <Skeleton className="h-7 w-32" />
    <Skeleton className="h-2 w-24 mt-2" />
  </div>
);

export const SkeletonSmallCard = ({ className }: { className?: string }) => (
  <div className={`rounded-2xl bg-white border-2 border-slate-900 p-4 shadow-[4px_4px_0px_#94a3b8] ${className ?? ""}`}>
    <Skeleton className="h-2.5 w-16 mb-3" />
    <Skeleton className="h-6 w-24" />
  </div>
);

export const SkeletonTable = () => (
  <div className="overflow-hidden rounded-2xl bg-white border-2 border-slate-900 shadow-[4px_4px_0px_#94a3b8]">
    <div className="border-b-2 border-slate-900 bg-slate-50 px-5 py-3.5 flex gap-8">
      {[140, 80, 60, 80].map((w, i) => (
        <Skeleton key={i} className="h-2.5" style={{ width: w }} />
      ))}
    </div>
    {[...Array(5)].map((_, i) => (
      <div key={i} className={`flex items-center gap-4 px-5 py-4 ${i !== 0 ? "border-t border-slate-100" : ""}`}>
        <Skeleton className="h-9 w-9 rounded-full shrink-0" />
        <Skeleton className="h-3.5 w-32" />
        <Skeleton className="h-3.5 w-20 ml-auto" />
        <Skeleton className="h-6 w-12 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    ))}
  </div>
);

export const SkeletonPageHeader = ({ label, title }: { label: string; title: string }) => (
  <div className="mb-8 flex items-end justify-between border-b border-slate-200 pb-6">
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">{label}</p>
      <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-200">{title}</h1>
    </div>
    <div className="rounded-xl bg-violet-200 border-2 border-slate-200 px-5 py-2.5 shadow-[3px_3px_0px_#cbd5e1] w-32 h-10 animate-pulse" />
  </div>
);

export default Skeleton;
