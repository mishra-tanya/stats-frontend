import { useEffect, useState } from "react";
import React from "react";
import useFetch from "@/hooks/useFetch";
import { format, parseISO, isToday, subDays } from "date-fns";

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

export function UserTableDb3() {
  const { data, loading, error } = useFetch<any>("db3/users");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRange, setFilterRange] = useState("all");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [results, setResults] = useState<Record<number, any[]>>({});
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [sortLatestFirst, setSortLatestFirst] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filterByDateRange = (data: any[]) => {
    const now = new Date();

    return data.filter((user) => {
      const createdAt = parseISO(user.created_at);

      if (fromDate && toDate) {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        return createdAt >= from && createdAt <= to;
      }

      switch (filterRange) {
      case "today":
        return isToday(createdAt);
      case "yesterday":
        const yesterday = subDays(now, 1);
        return (
          createdAt.toDateString() === yesterday.toDateString()
        );
      case "7":
        return createdAt >= subDays(now, 7);
      case "15":
        return createdAt >= subDays(now, 15);
      case "30":
        return createdAt >= subDays(now, 30);
      case "90":
        return createdAt >= subDays(now, 90);
      case "180":
        return createdAt >= subDays(now, 180);
      case "365":
        return createdAt >= subDays(now, 365);
      default:
        return true;
    }

    });
  };

  useEffect(() => {
    if (data) {
      const lower = searchTerm.toLowerCase();
      let filtered = filterByDateRange(data).filter((user: any) =>
        user.name?.toLowerCase().includes(lower) ||
        user.email?.toLowerCase().includes(lower) ||
        user.class?.toLowerCase().includes(lower) ||
        user.school?.toLowerCase().includes(lower)
      );

      filtered = filtered.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortLatestFirst ? dateB - dateA : dateA - dateB;
      });

      setFilteredData(filtered);
    }
  }, [data, searchTerm, filterRange, fromDate, toDate, sortLatestFirst]);

  const clearFilters = () => {
    setSearchTerm("");
    setFilterRange("all");
    setFromDate("");
    setToDate("");
  };

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
      setResults((prev) => ({ ...prev, [userId]: resultData || [] }));
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

        <div className="flex flex-wrap items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 border border-violet-300 rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <select
            value={filterRange}
            onChange={(e) => setFilterRange(e.target.value)}
            className="px-3 py-2 rounded border border-violet-300"
          >
             <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
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
            className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
          >
            Download CSV
          </button>
        </div>

        <div className="rounded-xl border-2 border-dashed border-violet-200 dark:border-violet-800 overflow-hidden bg-background/50 backdrop-blur-sm shadow-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-violet-50 dark:bg-violet-900/40 border-b-2 border-dashed border-violet-300 dark:border-violet-700">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">School</th>
                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2">Registered At</th>
                {/* <th className="px-4 py-2">Actions</th> */}
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
                    {/* <td className="px-4 py-2">
                      <button
                        onClick={() => fetchResults(user.id)}
                        className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                      >
                        {expandedRow === user.id ? "Hide Results" : "Show Results"}
                      </button>
                    </td> */}
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
