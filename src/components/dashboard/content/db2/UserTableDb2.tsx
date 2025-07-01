import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";

function convertToCSV(data: any[]) {
  const headers = ["#", "First Name", "Last Name", "Address", "Country", "Designation", "Email", "SCR", "Learning Obj", "Date Joined"];
  const rows = data.map((user, index) => [
    index + 1,
    user.first_name || "-",
    user.last_name || "-",
    user.address || "-",
    user.country || "-",
    user.designation || "-",
    user.email || "-",
    user.scr || "0.00",
    user.learning_obj || "0.00",
    user.created_at?.split("T")[0] || "-"
  ]);
  return [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n");
}

function filterByDate(data: any[], range: string, fromDate: string, toDate: string) {
  const today = new Date();

  return data.filter((user) => {
    const createdAt = new Date(user.created_at);

    if (fromDate && toDate) {
      return createdAt >= new Date(fromDate) && createdAt <= new Date(toDate);
    }

    switch (range) {
      case "today":
        return createdAt.toDateString() === today.toDateString();
      case "yesterday":
        const y = new Date(today);
        y.setDate(today.getDate() - 1);
        return createdAt.toDateString() === y.toDateString();
      case "last_7_days":
        const last7 = new Date(today);
        last7.setDate(today.getDate() - 7);
        return createdAt >= last7;
      case "last_15_days":
        const last15 = new Date(today);
        last15.setDate(today.getDate() - 15);
        return createdAt >= last15;
      case "last_month":
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        return createdAt >= lastMonth;
      case "last_3_months":
        const last3 = new Date(today);
        last3.setMonth(today.getMonth() - 3);
        return createdAt >= last3;
      case "last_6_months":
        const last6 = new Date(today);
        last6.setMonth(today.getMonth() - 6);
        return createdAt >= last6;
      case "last_year":
        const lastYear = new Date(today);
        lastYear.setFullYear(today.getFullYear() - 1);
        return createdAt >= lastYear;
      default:
        return true;
    }
  });
}

export function UserTableDb2() {
  const { data, loading, error } = useFetch<any>("db2/users");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    if (data) {
      let result = data;

      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        result = result.filter(
          (user: any) =>
            user.first_name?.toLowerCase().includes(term) ||
            user.last_name?.toLowerCase().includes(term) ||
            user.email?.toLowerCase().includes(term)
        );
      }

      result = filterByDate(result, dateRange, fromDate, toDate);

      result.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });

      setFilteredData(result);
    }
  }, [searchTerm, data, dateRange, fromDate, toDate, sortOrder]);

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

  const clearFilters = () => {
    setSearchTerm("");
    setDateRange("all");
    setFromDate("");
    setToDate("");
    setSortOrder("desc");
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="relative p-6 overflow-x-auto">
      {/* Background */}
      <div className="absolute inset-0 opacity-5 z-0" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 20%, violet 2px, transparent 2px),
          radial-gradient(circle at 80% 80%, fuchsia 1px, transparent 1px),
          radial-gradient(circle at 40% 60%, purple 1px, transparent 1px)
        `,
        backgroundSize: "30px 30px, 25px 25px, 35px 35px",
        animation: "patternMove 10s ease-in-out infinite",
      }} />
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-400 opacity-20 animate-tableGlow z-0" />

      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
          User Directory
        </h2>

        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 border border-violet-300 rounded-lg dark:bg-gray-800 dark:text-white"
          />

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-violet-300 rounded-lg dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last_7_days">Last 7 Days</option>
            <option value="last_15_days">Last 15 Days</option>
            <option value="last_month">Last 1 Month</option>
            <option value="last_3_months">Last 3 Months</option>
            <option value="last_6_months">Last 6 Months</option>
            <option value="last_year">Last 1 Year</option>
          </select>

          <div className="flex items-center gap-2">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-3 py-2 border border-violet-300 rounded-lg dark:bg-gray-800 dark:text-white"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-3 py-2 border border-violet-300 rounded-lg dark:bg-gray-800 dark:text-white"
            />
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border border-violet-300 rounded-lg dark:bg-gray-800 dark:text-white"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>

          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Clear Filters
          </button>

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
                {["#", "First Name", "Last Name", "Address", "Country", "Designation", "Email", "SCR", "Learning Obj", "Joined On"].map((head, i) => (
                  <th key={i} className="px-4 py-2 font-bold text-purple-700 dark:text-purple-300">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user: any, index: number) => (
                <tr
                  key={user.id}
                  className={`transition-all duration-300 border-b border-dashed border-muted 
                    hover:scale-[1.01] hover:shadow-sm ${
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
                  <td className="px-4 py-2">{user.first_name || "-"}</td>
                  <td className="px-4 py-2">{user.last_name || "-"}</td>
                  <td className="px-4 py-2">{user.address || "-"}</td>
                  <td className="px-4 py-2">{user.country || "-"}</td>
                  <td className="px-4 py-2">{user.designation || "-"}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.scr}</td>
                  <td className="px-4 py-2">{user.learning_obj}</td>
                  <td className="px-4 py-2 font-mono">{user.created_at?.split("T")[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
