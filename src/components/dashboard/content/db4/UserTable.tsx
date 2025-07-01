import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { format, parseISO, isToday, subDays } from "date-fns";

function convertToCSV(data: any[]) {
  const headers = ["#", "Username", "First Name", "Last Name", "Is Staff", "Is Active", "Date Joined"];
  const rows = data.map((user, index) => [
    index + 1,
    user.username,
    user.first_name,
    user.last_name,
    user.is_staff ? "Yes" : "No",
    user.is_active ? "Yes" : "No",
    user.date_joined,
  ]);
  return [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n");
}

export function UserTable() {
  const { data, loading, error } = useFetch<any>("db4/users");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRange, setFilterRange] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortLatestFirst, setSortLatestFirst] = useState(true);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const filterByDateRange = (data: any[]) => {
    const now = new Date();
    return data.filter((user) => {
      const joinedAt = parseISO(user.date_joined);

      if (fromDate && toDate) {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        return joinedAt >= from && joinedAt <= to;
      }

      switch (filterRange) {
        case "today":
          return isToday(joinedAt);
        case "7":
          return joinedAt >= subDays(now, 7);
        case "15":
          return joinedAt >= subDays(now, 15);
        case "30":
          return joinedAt >= subDays(now, 30);
        case "90":
          return joinedAt >= subDays(now, 90);
        case "180":
          return joinedAt >= subDays(now, 180);
        case "365":
          return joinedAt >= subDays(now, 365);
        default:
          return true;
      }
    });
  };

  useEffect(() => {
    if (data) {
      const term = searchTerm.toLowerCase();
      let filtered = filterByDateRange(data).filter(
        (user: any) =>
          user.username?.toLowerCase().includes(term) ||
          user.first_name?.toLowerCase().includes(term) ||
          user.last_name?.toLowerCase().includes(term)
      );

      filtered = filtered.sort((a, b) => {
        const dateA = new Date(a.date_joined).getTime();
        const dateB = new Date(b.date_joined).getTime();
        return sortLatestFirst ? dateB - dateA : dateA - dateB;
      });

      setFilteredData(filtered);
    }
  }, [searchTerm, data, filterRange, fromDate, toDate, sortLatestFirst]);

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
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="relative p-6 overflow-x-auto">
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
          User Directory
        </h2>

        <div className="flex flex-wrap items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 border border-violet-300 rounded-lg"
          />
          <select
            value={filterRange}
            onChange={(e) => setFilterRange(e.target.value)}
            disabled={fromDate && toDate !== ""}
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
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="px-3 py-2 border border-violet-300 rounded-lg" />
          <span>to</span>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="px-3 py-2 border border-violet-300 rounded-lg" />
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

        <div className="rounded-xl border-2 border-dashed border-violet-200 overflow-hidden bg-background/50 backdrop-blur-sm shadow-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-violet-50 border-b-2 border-dashed border-violet-300">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Is Staff</th>
                <th className="px-4 py-2">Active</th>
                <th className="px-4 py-2">Joined On</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user: any, index: number) => (
                <tr
                  key={user.id}
                  className="border-b border-dashed hover:bg-purple-50 transition"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 font-medium">{user.username}</td>
                  <td className="px-4 py-2">{user.first_name || "-"}</td>
                  <td className="px-4 py-2">{user.last_name || "-"}</td>
                  <td className="px-4 py-2">{user.is_staff ? "Yes" : "No"}</td>
                  <td className="px-4 py-2">{user.is_active ? "Yes" : "No"}</td>
                  <td className="px-4 py-2 font-mono">{format(parseISO(user.date_joined), "yyyy-MM-dd")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
