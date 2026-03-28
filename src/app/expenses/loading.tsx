import { SkeletonSmallCard, SkeletonTable, SkeletonPageHeader } from "../components/Skeleton";

const Loading = () => (
  <main className="min-h-screen px-10 py-10">
    <SkeletonPageHeader label="Expenses" title="支出一覧" />

    <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
      <SkeletonSmallCard />
      <SkeletonSmallCard />
      <SkeletonSmallCard />
      <SkeletonSmallCard />
    </div>

    <SkeletonTable />
  </main>
);

export default Loading;
