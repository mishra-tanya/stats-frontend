import { useState } from "react";
import { DashboardAreaChart } from "../../charts/AreaChart";
import { StatsCard } from "../../charts/StatsCard";
import { UserPlus } from "lucide-react";
import useFetch from "@/hooks/useFetch";

const rangeOptions = [
  { label: "Last 7 Days", value: "7" },
  { label: "Last 15 Days", value: "15" },
  { label: "Last 30 Days", value: "30" },
  { label: "Last 3 Months", value: "90" },
  { label: "Last 6 Months", value: "180" },
  { label: "Last Year", value: "365" },
];

export default function RegistrationAnalytics() {
  const [range, setRange] = useState("30");

  const {
    data: chartData = [],
    loading: chartLoading,
    error: chartError,
  } = useFetch(`/db3/registration-trends?range=${range}`, [range]);

  const {
    data: stats = { weekly: 0, monthly: 0 },
    loading: statsLoading,
    error: statsError,
  } = useFetch("/api/registration-stats");

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <StatsCard
          title="New Users (7 Days)"
          value={stats.weekly}
          icon={UserPlus}
          colorScheme="blue"
        />
        <StatsCard
          title="New Users (30 Days)"
          value={stats.monthly}
          icon={UserPlus}
          colorScheme="purple"
        />
      </div>

      {/* Chart + Dropdown */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-foreground">Registration Trends</h2>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
        >
          {rangeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      {chartLoading ? (
        <p className="text-muted-foreground text-sm">Loading chart...</p>
      ) : chartError ? (
        <p className="text-red-500">Error loading chart.</p>
      ) : (
        <DashboardAreaChart
          data={chartData}
          title="User Registrations"
          description="User growth over time"
          range={range}
        />
      )}
    </div>
  );
}
