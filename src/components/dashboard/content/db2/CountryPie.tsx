// components/wrappers/CountryPieChartWrapper.tsx
import { useState, useEffect } from "react";
import { DashboardPieChart } from "../../charts/PieChart";
import useFetch from "@/hooks/useFetch";

interface CountryData {
  name: string;
  value: number;
}

const COLORS = [
  "#10B981", "#06B6D4", "#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B",
  "#EF4444", "#14B8A6", "#0EA5E9", "#6366F1", "#E11D48", "#84CC16",
];

export default function CountryPieChartWrapper() {
  const { data, loading, error } = useFetch<CountryData[]>("db2/country-distribution");

  // Add `fill` color to each country
  const chartData = (data || []).map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading country chart...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <DashboardPieChart
          data={chartData}
          title="User Distribution by Country"
          description="Based on registered users"
        />
      )}
    </div>
  );
}
