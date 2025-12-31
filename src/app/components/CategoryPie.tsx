"use client";

import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { CategoryBreakdown } from "../../types/dashboard";

type Props = {
  data: CategoryBreakdown[];
};

export const CategoryPie = ({ data }: Props) => {
  const chartData = data.map((d) => ({
    name: d.category_name,
    value: d.amount_monthly,
  }));

  if (chartData.length === 0) {
    return <div className="text-sm text-zinc-500">データがありません</div>;
  }

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={90} label />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
