import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";

interface EmissionRecord {
    id: number;
    asset_class: string;
    data_quality_score: string;
    created_at: string;
    user: { id: number; username: string; email: string };
    data: Record<string, any>;
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

    const emissions: EmissionRecord[] = data || [];

    useEffect(() => {
        if (data) {
            const term = searchTerm.toLowerCase();
            const filtered = emissions.filter(
                (r) =>
                    r.user?.username?.toLowerCase().includes(term) ||
                    r.asset_class.toLowerCase().includes(term) ||
                    r.data_quality_score.toLowerCase().includes(term)
            );
            setFilteredData(filtered);
        }
    }, [searchTerm, data]);

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="relative p-6 overflow-x-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by name, class, or score..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-2/3 px-4 py-2 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 dark:bg-gray-800 dark:text-white"
                />
                <button
                    onClick={downloadCSV}
                    className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
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
                                <tr className="border-b hover:bg-violet-50 dark:hover:bg-violet-950/10">
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
                                {expandedId === record.id && (
  (() => {
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
  })()
)}


                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
