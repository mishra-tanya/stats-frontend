import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { format, parseISO, isToday, subDays } from "date-fns";

interface EmissionRecord {
  id: number;
  asset_class: string;
  data_quality_score: string;
  created_at: string;
  user: { id: number; username: string; email: string };
  data: Record<string, any>;
  emission_factors: string;
}

function convertToCSV(data: EmissionRecord[]) {
  const headers = [
    "ID",
    "User Name",
    "Asset Class",
    "Data Quality Score",
    "Created At",
    ...new Set(data.flatMap((d) => Object.keys(d.data)))
  ];

  const rows = data.map((record) => {
    const base = [
      record.id,
      record.user?.username || "N/A",
      record.asset_class,
      record.data_quality_score,
      record.created_at,
    ];
    const nested = headers.slice(5).map((key) => record.data[key] ?? "");
    return [...base, ...nested];
  });

  return [headers.join(","), ...rows.map((r) => r.map((v) => `"${v}"`).join(","))].join("\n");
}

export function FinanceEmissionTable() {
  const { data, loading, error } = useFetch<any>("db4/finance-emissions");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<EmissionRecord[]>([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortLatestFirst, setSortLatestFirst] = useState(true);
  const [range, setRange] = useState("all");

  const emissions: EmissionRecord[] = data || [];

  useEffect(() => {
    if (data) {
      const term = searchTerm.toLowerCase();
      let filtered = emissions.filter(
        (r) =>
          r.user?.username?.toLowerCase().includes(term) ||
          r.asset_class.toLowerCase().includes(term) ||
          r.data_quality_score.toLowerCase().includes(term)
      );

      const now = new Date();

      if (fromDate && toDate) {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        filtered = filtered.filter((r) => {
          const date = new Date(r.created_at);
          return date >= from && date <= to;
        });
      } else {
        switch (range) {
          case "today":
            filtered = filtered.filter((r) => isToday(new Date(r.created_at)));
            break;
          case "7":
            filtered = filtered.filter((r) => new Date(r.created_at) >= subDays(now, 7));
            break;
          case "15":
            filtered = filtered.filter((r) => new Date(r.created_at) >= subDays(now, 15));
            break;
          case "30":
            filtered = filtered.filter((r) => new Date(r.created_at) >= subDays(now, 30));
            break;
          case "90":
            filtered = filtered.filter((r) => new Date(r.created_at) >= subDays(now, 90));
            break;
          case "180":
            filtered = filtered.filter((r) => new Date(r.created_at) >= subDays(now, 180));
            break;
          case "365":
            filtered = filtered.filter((r) => new Date(r.created_at) >= subDays(now, 365));
            break;
          default:
            break;
        }
      }

      filtered.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortLatestFirst ? dateB - dateA : dateA - dateB;
      });

      setFilteredData(filtered);
    }
  }, [searchTerm, data, fromDate, toDate, sortLatestFirst, range]);

  const downloadCSV = () => {
    const csv = convertToCSV(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "finance_emissions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFromDate("");
    setToDate("");
    setRange("all");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative p-6 overflow-x-auto">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, class, or score..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 border border-violet-300 rounded-lg"
        />
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="px-3 py-2 border border-violet-300 rounded-lg"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="7">Last 7 Days</option>
          <option value="15">Last 15 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 3 Months</option>
          <option value="180">Last 6 Months</option>
          <option value="365">Last 1 Year</option>
        </select>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="px-3 py-2 border border-violet-300 rounded-lg"
        />
        <span>to</span>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="px-3 py-2 border border-violet-300 rounded-lg"
        />
        <button
          onClick={() => setSortLatestFirst(!sortLatestFirst)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
        >
          Sort: {sortLatestFirst ? "Latest → Oldest" : "Oldest → Latest"}
        </button>
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

      <div className="rounded-xl border-2 border-dashed border-violet-200 dark:border-violet-800 overflow-hidden bg-background/50 backdrop-blur-sm shadow-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-violet-50 dark:bg-violet-900/40 border-b-2 border-dashed border-violet-300 dark:border-violet-700">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Asset Class</th>
              <th className="px-4 py-2">Data Quality</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((record, index) => (
              <>
                <tr key={record.id} className="border-b hover:bg-violet-50 dark:hover:bg-violet-950/10">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{record.user?.username || "N/A"}</td>
                  <td className="px-4 py-2">{record.asset_class}</td>
                  <td className="px-4 py-2">{record.data_quality_score}</td>
                  <td className="px-4 py-2">{record.created_at}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() =>
                        setExpandedId((prev) => (prev === record.id ? null : record.id))
                      }
                      className="text-sm text-violet-600 hover:underline"
                    >
                      {expandedId === record.id ? "Hide" : "Show More"}
                    </button>
                  </td>
                </tr>
                {expandedId === record.id && (() => {
                  let parsedData: Record<string, any> = {};
                  try {
                    parsedData = JSON.parse(record.emission_factors);
                  } catch (e) {
                    console.error("Invalid JSON in emission_factors", e);
                  }

                  if (Object.keys(parsedData).length === 0) return null;

                  const sections = [];
                  let currentHeading = null;
                  let group: [string, any][] = [];

                  for (const [key, value] of Object.entries(parsedData)) {
                    if (key.startsWith("heading")) {
                      if (currentHeading || group.length > 0) {
                        sections.push({ heading: currentHeading, items: group });
                        group = [];
                      }
                      currentHeading = value;
                    } else {
                      group.push([key, value]);
                    }
                  }

                  if (currentHeading || group.length > 0) {
                    sections.push({ heading: currentHeading, items: group });
                  }

                  return (
                    <tr className="bg-violet-50 dark:bg-violet-900/20">
                      <td colSpan={6} className="p-4">
                        <div className="text-xs space-y-4">
                          {sections.map((section, index) => (
                            <div key={index}>
                              <h4 className="text-sm font-semibold text-blue-600 mb-2">
                                {section.heading}
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {section.items.map(([key, value]) => (
                                  <div key={key} className="flex gap-2">
                                    <span className="font-medium capitalize">
                                      {key.replaceAll("_", " ").replaceAll("(USD)", "").trim()}:
                                    </span>
                                    <span>{value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })()}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}