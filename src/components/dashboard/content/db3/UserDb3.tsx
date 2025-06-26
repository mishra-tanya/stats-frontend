import { useEffect, useState } from "react";
import React from "react";
import useFetch from "@/hooks/useFetch";
import { format, isToday, subDays, parseISO } from "date-fns";

const convertToCSV = (data: any[]) => {
  const headers = ["#", "Name", "Email", "School", "Class", "Registered At"];
  const rows = data.map((user, index) => [
    index + 1,
    user.name,
    user.email,
    user.school,
    user.class,
    format(parseISO(user.created_at), "yyyy-MM-dd"),
  ]);
  return [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");
};

const filterByDateRange = (data: any[], range: string) => {
  const now = new Date();
  return data.filter((user) => {
    const createdAt = parseISO(user.created_at);
    switch (range) {
      case "today":
        return isToday(createdAt);
      case "7":
        return createdAt >= subDays(now, 7);
      case "30":
        return createdAt >= subDays(now, 30);
      default:
        return true;
    }
  });
};

export function UserTableDb3() {
  const { data, loading, error } = useFetch<any>("db3/users");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRange, setFilterRange] = useState("all");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [results, setResults] = useState<Record<number, any[]>>({});
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      const filteredByDate = filterByDateRange(data, filterRange);
      const lower = searchTerm.toLowerCase();
      const filtered = filteredByDate.filter((user: any) =>
        user.name?.toLowerCase().includes(lower) ||
        user.email?.toLowerCase().includes(lower) ||
        user.class?.toLowerCase().includes(lower) ||
        user.school?.toLowerCase().includes(lower)
      );
      setFilteredData(filtered);
    }
  }, [data, searchTerm, filterRange]);

  const downloadCSV = () => {
    const csv = convertToCSV(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "user_directory.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchResults = async (userId: number) => {
    if (expandedRow === userId) {
      setExpandedRow(null);
      return;
    }

    if (results[userId]) {
      setExpandedRow(userId);
      return;
    }

    try {
      const res = await fetch(`/db3/results/${userId}`);
      const json = await res.json();
      const resultData = Array.isArray(json) ? json : json.data;
console.log(resultData);
      if (Array.isArray(resultData)) {
        setResults((prev) => ({ ...prev, [userId]: resultData }));
      } else {
        setResults((prev) => ({ ...prev, [userId]: [] }));
      }

      setExpandedRow(userId);
    } catch (err) {
      console.error("Error fetching results", err);
      setResults((prev) => ({ ...prev, [userId]: [] }));
      setExpandedRow(userId);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="relative p-6 overflow-x-auto">
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

      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
          Registered Users
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 dark:bg-gray-800 dark:text-white"
          />
          <select
            value={filterRange}
            onChange={(e) => setFilterRange(e.target.value)}
            className="px-3 py-2 rounded border border-violet-300"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
          </select>
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
                <th className="px-4 py-2 text-violet-700">#</th>
                <th className="px-4 py-2 text-fuchsia-700">Name</th>
                <th className="px-4 py-2 text-purple-700">Email</th>
                <th className="px-4 py-2 text-purple-700">School</th>
                <th className="px-4 py-2 text-purple-700">Class</th>
                <th className="px-4 py-2 text-violet-700">Registered At</th>
                <th className="px-4 py-2 text-violet-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user: any, index: number) => (
                <React.Fragment key={user.id}>
                  <tr className="border-b border-dashed hover:bg-purple-50 transition">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 font-medium">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.school}</td>
                    <td className="px-4 py-2">{user.class}</td>
                    <td className="px-4 py-2 font-mono">
                      {format(parseISO(user.created_at), "yyyy-MM-dd")}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => fetchResults(user.id)}
                        className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                      >
                        {expandedRow === user.id ? "Hide Results" : "Show Results"}
                      </button>
                    </td>
                  </tr>
                  {expandedRow === user.id && (
                    <tr className="bg-purple-50/40">
                      <td colSpan={7} className="px-4 py-2">
                        <h4 className="font-bold mb-2 text-purple-600">Results:</h4>
                        {results[user.id]?.length === 0 ? (
                          <p className="italic text-sm">No results found.</p>
                        ) : (
                          <table className="w-full text-xs border mt-2">
                            <thead className="bg-purple-200">
                              <tr>
                                <th className="px-2 py-1">Goal</th>
                                <th className="px-2 py-1">Score</th>
                                <th className="px-2 py-1">Test ID</th>
                                <th className="px-2 py-1">Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {results[user.id].map((r: any) => (
                                <tr key={r.id} className="border-t">
                                  <td className="px-2 py-1">{r.goal_name}</td>
                                  <td className="px-2 py-1">{r.score}</td>
                                  <td className="px-2 py-1">{r.test_id}</td>
                                  <td className="px-2 py-1">
                                    {format(parseISO(r.created_at), "yyyy-MM-dd")}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
