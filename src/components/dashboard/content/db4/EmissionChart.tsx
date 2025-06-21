import { useState } from "react";
import { DashboardAreaChart } from "../../charts/AreaChart";
import useFetch from "@/hooks/useFetch";

const ranges = [
  { label: "Last 7 Days", value: "7" },
  { label: "15 Days", value: "15" },
  { label: "30 Days", value: "30" },
  { label: "3 Months", value: "90" },
  { label: "6 Months", value: "180" },
  { label: "1 Year", value: "365" },
];

export function EmissionChartWrapper() {
  const [range, setRange] = useState("7");
  const { data, loading, error } = useFetch<any>(`db4/emission-stats?range=${range}`);

  return (
    <div className="p-4">
      <select
        className="mb-4 border rounded px-3 py-1"
        value={range}
        onChange={(e) => setRange(e.target.value)}
      >
        {ranges.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && data && (
        <DashboardAreaChart
          data={data}
          title="Tracked Emissions"
          description={`Emissions recorded over the last ${range} days`}
          range={range}
        />
      )}
    </div>
  );
}
