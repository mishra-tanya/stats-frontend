import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";

const RANGE_OPTIONS = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "7days" },
  { label: "Last 15 Days", value: "15days" },
  { label: "Last 30 Days", value: "30days" },
  { label: "Last 3 Months", value: "3months" },
  { label: "Last 6 Months", value: "6months" },
  { label: "Last 1 Year", value: "1year" },
];

function convertToCSV(data: any[]) {
  const headers = ["#", "URL", "Views"];
  const rows = data.map((item, index) => [index + 1, item.url, item.views]);
  return [headers.join(","), ...rows.map(row => row.map(v => `"${v}"`).join(","))].join("\n");
}

export function SiteAnalyticsTable({ site }: { site: string }) {
  const [range, setRange] = useState("today");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [url, setUrl] = useState(`analytics/site/${site}?range=${range}`);
  const { data, loading, error } = useFetch<any[]>(url);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    setLocalLoading(true);
    if (fromDate && toDate) {
      setUrl(`analytics/site/${site}?from=${fromDate}&to=${toDate}`);
    } else {
      setUrl(`analytics/site/${site}?range=${range}`);
    }
  }, [range, site, fromDate, toDate]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter(item =>
        item.url.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
      setLocalLoading(false);
    }
  }, [searchTerm, data]);

  const downloadCSV = () => {
    const csv = convertToCSV(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `site_${site}_analytics.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    setRange("today");
    setSearchTerm("");
  };

  return (
    <div className="relative p-6 overflow-x-auto">
      {/* Background Animations */}
      <div
        className="absolute inset-0 opacity-5 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, violet 2px, transparent 2px),
            radial-gradient(circle at 80% 80%, fuchsia 1px, transparent 1px),
            radial-gradient(circle at 40% 60%, purple 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px, 25px 25px, 35px 35px",
          animation: "patternMove 10s ease-in-out infinite",
        }}
      />
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-400 opacity-20 animate-tableGlow z-0" />
      <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-violet-400/20 to-transparent rounded-br-full z-0" />
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-fuchsia-400/20 to-transparent rounded-tl-full z-0" />

      {/* Table Header */}
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
          Site Analytics – {site}
        </h2>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 flex-wrap">
          <input
            type="text"
            placeholder="Search by URL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 border border-violet-300 rounded-lg"
          />

          <select
            value={range}
            onChange={(e) => {
              setRange(e.target.value);
              setFromDate("");
              setToDate("");
            }}
            className="px-4 py-2 border border-violet-300 rounded-lg"
          >
            {RANGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                setRange("");
              }}
              className="px-3 py-2 border border-violet-300 rounded-lg"
            />
            <span className="self-center">to</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
                setRange("");
              }}
              className="px-3 py-2 border border-violet-300 rounded-lg"
            />
          </div>

          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Clear Filters
          </button>

          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
          >
            Download CSV
          </button>
        </div>

        {/* Content */}
        {(loading || localLoading) && <p className="p-4">Loading...</p>}
        {error && <p className="p-4 text-red-500">Error: {error}</p>}

        {!loading && !localLoading && filteredData.length > 0 && (
          <div className="rounded-xl border-2 border-dashed border-violet-200 dark:border-violet-800 overflow-hidden bg-background/50 backdrop-blur-sm shadow-lg">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-violet-50 dark:bg-violet-900/40 border-b-2 border-dashed border-violet-300 dark:border-violet-700">
                <tr>
                  <th className="px-4 py-2 font-bold text-violet-700 dark:text-violet-300">#</th>
                  <th className="px-4 py-2 font-bold text-fuchsia-700 dark:text-fuchsia-300">URL</th>
                  <th className="px-4 py-2 font-bold text-purple-700 dark:text-purple-300">Views</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className={`transition-all duration-300 border-b border-dashed border-muted hover:scale-[1.01] hover:shadow-sm ${
                      [
                        "hover:bg-blue-50/50 dark:hover:bg-blue-950/20",
                        "hover:bg-purple-50/50 dark:hover:bg-purple-950/20",
                        "hover:bg-green-50/50 dark:hover:bg-green-950/20",
                        "hover:bg-orange-50/50 dark:hover:bg-orange-950/20",
                        "hover:bg-pink-50/50 dark:hover:bg-pink-950/20",
                      ][index % 5]
                    }`}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 font-mono">{item.url}</td>
                    <td className="px-4 py-2 font-medium">{item.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !localLoading && filteredData.length === 0 && <p>No data found.</p>}
      </div>
    </div>
  );
}
