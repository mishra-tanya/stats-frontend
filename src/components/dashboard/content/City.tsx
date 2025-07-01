import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";

function convertToCSV(users: any[]) {
  const headers = ["#", "Country", "City", "Users"];
  const rows = users.map((user, index) => [
    index + 1,
    user.country,
    user.city,
    user.users,
  ]);
  return [headers.join(","), ...rows.map(row => row.map(v => `"${v}"`).join(","))].join("\n");
}

const dateRanges = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "7days" },
  { label: "Last 15 Days", value: "15days" },
  { label: "Last 30 Days", value: "30days" },
  { label: "Last 3 Months", value: "3months" },
  { label: "Last 6 Months", value: "6months" },
  { label: "Last 1 Year", value: "1year" },
];

export function CityCountryUsersTable({ site }: { site: string }) {
  const [range, setRange] = useState("today");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [url, setUrl] = useState(`analytics/city/${site}?range=${range}`);
  const { data, loading, error } = useFetch<any[]>(url);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  useEffect(() => {
    let query = `analytics/city/${site}`;
    if (fromDate && toDate) {
      query += `?from=${fromDate}&to=${toDate}`;
    } else {
      query += `?range=${range}`;
    }
    setUrl(query);
  }, [range, fromDate, toDate, site]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter(
        (item) =>
          item.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.city?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [data, searchTerm]);

  const downloadCSV = () => {
    const csv = convertToCSV(filteredUsers);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `city_country_users.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearDates = () => {
    setFromDate("");
    setToDate("");
  };

  return (
    <div className="relative p-6 overflow-x-auto">
      {/* Background Effects */}
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

      {/* Header and Controls */}
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
          Users by City & Country – {site}
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search city or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 dark:bg-gray-800 dark:text-white"
          />
          <select
            value={range}
            onChange={(e) => {
              setRange(e.target.value);
              clearDates(); // Reset date pickers if range selected
            }}
            className="px-4 py-2 border border-violet-300 rounded-lg dark:bg-gray-800 dark:text-white"
          >
            {dateRanges.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => {
              setFromDate(e.target.value);
              setRange(""); // clear range dropdown if manual date is picked
            }}
            className="px-4 py-2 border border-violet-300 rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => {
              setToDate(e.target.value);
              setRange(""); // clear range dropdown if manual date is picked
            }}
            className="px-4 py-2 border border-violet-300 rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={clearDates}
            className="px-3 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Clear Dates
          </button>
          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
          >
            Download CSV
          </button>
        </div>

        {/* Data Table */}
        {loading && <p className="p-4">Loading...</p>}
        {error && <p className="p-4 text-red-500">Error: {error}</p>}

        {!loading && filteredUsers.length > 0 && (
          <div className="rounded-xl border-2 border-dashed border-violet-200 dark:border-violet-800 overflow-hidden bg-background/50 backdrop-blur-sm shadow-lg">
            <table className="min-w-full text-sm text-center">
              <thead className="bg-violet-50 dark:bg-violet-900/40 border-b-2 border-dashed border-violet-300 dark:border-violet-700">
                <tr>
                  <th className="px-4 py-2 font-bold text-violet-700 dark:text-violet-300">#</th>
                  <th className="px-4 py-2 font-bold text-fuchsia-700 dark:text-fuchsia-300">Country</th>
                  <th className="px-4 py-2 font-bold text-purple-700 dark:text-purple-300">City</th>
                  <th className="px-4 py-2 font-bold text-indigo-700 dark:text-indigo-300">Users</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((item, index) => (
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
                    <td className="px-4 py-2">{item.country}</td>
                    <td className="px-4 py-2">{item.city}</td>
                    <td className="px-4 py-2">{item.users}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filteredUsers.length === 0 && <p>No data found.</p>}
      </div>
    </div>
  );
}
