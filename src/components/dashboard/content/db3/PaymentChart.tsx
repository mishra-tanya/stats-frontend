import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { DashboardAreaChart } from "../../charts/AreaChart";

export default function PaymentAreaChartWrapper() {
  const [range, setRange] = useState("7"); 
  const { data, loading, error } = useFetch<any>(`db3/payment-stats?range=${range}`);

  const transformedData = (data || []).map((item: any) => ({
    name: item.name,
    users: item.payments,
    date: item.name,
  }));

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-2xl font-bold text-blue-700">Payment Activity</h2>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
        >
          <option value="7">Last 7 Days</option>
          <option value="15">Last 15 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 3 Months</option>
          <option value="180">Last 6 Months</option>
          <option value="365">Last Year</option>
        </select>
      </div>

      {loading && <p>Loading chart...</p>}
      {error && <p className="text-red-500">Error loading data</p>}
      {!loading && !error && (
        <DashboardAreaChart
          data={transformedData}
          title="Payments Over Time"
          description={`Showing payment count over the last ${range} days`}
          range={range}
        />
      )}
    </div>
  );
}
