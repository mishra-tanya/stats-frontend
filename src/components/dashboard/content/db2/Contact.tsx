import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
}

function convertToCSV(data: ContactMessage[]) {
  const headers = ["#", "Name", "Email", "Phone", "Subject", "Message", "Date"];
  const rows = data.map((msg, index) => [
    index + 1,
    msg.name,
    msg.email,
    msg.phone,
    msg.subject,
    msg.message,
    msg.created_at.split("T")[0],
  ]);
  return [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n");
}

function filterByDate(messages: ContactMessage[], range: string): ContactMessage[] {
  const today = new Date();
  return messages.filter((msg) => {
    const createdAt = new Date(msg.created_at);
    if (range === "today") {
      return createdAt.toDateString() === today.toDateString();
    }
    if (range === "last_week") {
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      return createdAt >= lastWeek;
    }
    if (range === "last_month") {
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);
      return createdAt >= lastMonth;
    }
    return true;
  });
}

export function ContactMessageTable() {
  const { data, loading, error } = useFetch<ContactMessage[]>("db2/contact-messages");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<ContactMessage[]>([]);
  const [dateRange, setDateRange] = useState("all");

  useEffect(() => {
    if (data) {
      const term = searchTerm.toLowerCase();
      const filtered = data.filter(
        (msg) =>
          msg.name.toLowerCase().includes(term) ||
          msg.email.toLowerCase().includes(term) ||
          msg.subject.toLowerCase().includes(term) ||
          msg.message.toLowerCase().includes(term)
      );
      const finalData = dateRange === "all" ? filtered : filterByDate(filtered, dateRange);
      setFilteredData(finalData);
    }
  }, [searchTerm, data, dateRange]);

  const downloadCSV = () => {
    const csv = convertToCSV(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "contact_messages.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p className="p-4">Loading messages...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="relative p-6 overflow-x-auto">
      {/* Decorative Background */}
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
          Contact Messages
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-2/3 px-4 py-2 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 dark:bg-gray-800 dark:text-white"
          />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="last_week">Last Week</option>
            <option value="last_month">Last Month</option>
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
                <th className="px-4 py-2 font-bold text-violet-700 dark:text-violet-300">#</th>
                <th className="px-4 py-2 font-bold text-purple-700 dark:text-purple-300">Name</th>
                <th className="px-4 py-2 font-bold text-purple-700 dark:text-purple-300">Email</th>
                <th className="px-4 py-2 font-bold text-purple-700 dark:text-purple-300">Phone</th>
                <th className="px-4 py-2 font-bold text-purple-700 dark:text-purple-300">Subject</th>
                <th className="px-4 py-2 font-bold text-purple-700 dark:text-purple-300">Message</th>
                <th className="px-4 py-2 font-bold text-purple-700 dark:text-purple-300">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((msg, index) => (
                <tr
                  key={msg.id}
                  className={`transition-all duration-300 border-b border-dashed border-muted hover:scale-[1.01] hover:shadow-sm hover:bg-purple-50/50 dark:hover:bg-purple-950/20`}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{msg.name}</td>
                  <td className="px-4 py-2">{msg.email}</td>
                  <td className="px-4 py-2">{msg.phone}</td>
                  <td className="px-4 py-2">{msg.subject}</td>
                  <td className="px-4 py-2">{msg.message}</td>
                  <td className="px-4 py-2 font-mono">{msg.created_at.split("T")[0]}</td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                    No matching messages.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
