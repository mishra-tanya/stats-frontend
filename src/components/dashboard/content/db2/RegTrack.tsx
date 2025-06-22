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

export function RegistrationDb2Wrapper() {
  const [range, setRange] = useState("7");

  const endpoint = `db2/track-reg?range=${range}`;
  const { data, loading, error } = useFetch<any[]>(endpoint);

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

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <DashboardAreaChart
          range={range}
          data={data || []}
          title="User Registrations"
          description={`Showing registrations over the last ${range} day(s)`}
        />
      )}
    </div>
  );
}
