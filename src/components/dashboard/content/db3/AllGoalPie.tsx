import { DashboardPieChart } from "../../charts/PieChart";
import useFetch from "@/hooks/useFetch";

interface PieChartData {
  name: string;
  value: number;
  fill: string;
}

const COLORS = [
  "#10B981", "#06B6D4", "#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B",
  "#EF4444", "#14B8A6", "#0EA5E9", "#6366F1", "#E11D48", "#84CC16",
  "#F43F5E", "#A78BFA", "#34D399", "#FB923C", "#4ADE80"
];

export default function GoalCompletionByClassChart() {
  const { data, loading, error } = useFetch<any[]>("db3/all-goal-completion");

  const chartData: PieChartData[] = (data || []).map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading chart...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <DashboardPieChart
          data={chartData}
          title="Goal Completion by Class"
          description="Users who completed all 17 SDG goals (at least 3 times each)"
        />
      )}
    </div>
  );
}
