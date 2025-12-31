export type CategoryBreakdown = {
  category_id: number;
  category_name: string;
  amount_monthly: number;
};

export type DashboardSummary = {
  user_id: string;
  total_monthly: number;
  total_yearly: number;
  by_category: CategoryBreakdown[];
  cancel_candidates: number;
};
