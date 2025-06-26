import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { format, isToday, subDays, parseISO } from "date-fns";

const convertToCSV = (data: any[]) => {
  const headers = ["#", "Name", "Email", "Payment Type", "Amount", "Payment ID", "Status", "Created At"];
  const rows = data.map((item, index) => [
    index + 1,
    item.user?.name || "-",
    item.user?.email || "-",
    item.payment_type,
    item.amount,
    item.razorpay_payment_id,
    item.status,
    format(parseISO(item.created_at), "yyyy-MM-dd"),
  ]);
  return [headers.join(","), ...rows.map(row => row.map(cell => `"${cell}"`).join(","))].join("\n");
};

const filterByDateRange = (data: any[], range: string) => {
  const now = new Date();
  return data.filter((item) => {
    const createdAt = parseISO(item.created_at);
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

export function PaymentTable() {
  const { data, loading, error } = useFetch<any>("db4/payment");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRange, setFilterRange] = useState("all");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const filteredByDate = filterByDateRange(data, filterRange);
      const lower = searchTerm.toLowerCase();
      const filtered = filteredByDate.filter((item: any) =>
        item.user?.name?.toLowerCase().includes(lower) ||
        item.user?.email?.toLowerCase().includes(lower) ||
        item.razorpay_payment_id?.toLowerCase().includes(lower)
      );
      setFilteredData(filtered);
    }
  }, [data, searchTerm, filterRange]);

  const downloadCSV = () => {
    const csv = convertToCSV(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "payments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="relative p-6 overflow-x-auto">
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Payments Report
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name, email or payment ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
          />
          <select
            value={filterRange}
            onChange={(e) => setFilterRange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-blue-300 dark:border-blue-700 bg-white dark:bg-gray-800 text-sm dark:text-white"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
          </select>
          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Download CSV
          </button>
        </div>

        <div className="rounded-xl border-2 border-dashed border-blue-200 dark:border-blue-800 overflow-hidden bg-background/50 backdrop-blur-sm shadow-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-50 dark:bg-blue-900/40 border-b-2 border-dashed border-blue-300 dark:border-blue-700">
              <tr>
                <th className="px-4 py-2 font-bold text-blue-700 dark:text-blue-300">#</th>
                <th className="px-4 py-2 font-bold text-emerald-700 dark:text-emerald-300">Name</th>
                <th className="px-4 py-2 font-bold text-teal-700 dark:text-teal-300">Email</th>
                <th className="px-4 py-2 font-bold text-blue-700 dark:text-blue-300">Payment Type</th>
                <th className="px-4 py-2 font-bold text-blue-700 dark:text-blue-300">Amount</th>
                <th className="px-4 py-2 font-bold text-blue-700 dark:text-blue-300">Payment ID</th>
                <th className="px-4 py-2 font-bold text-blue-700 dark:text-blue-300">Status</th>
                <th className="px-4 py-2 font-bold text-blue-700 dark:text-blue-300">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item: any, index: number) => (
                <tr
                  key={item.id}
                  className={`transition-all duration-300 border-b border-dashed border-muted 
                    hover:scale-[1.01] hover:shadow-sm ${
                      [
                        "hover:bg-teal-50/50 dark:hover:bg-teal-950/20",
                        "hover:bg-blue-50/50 dark:hover:bg-blue-950/20",
                        "hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20",
                      ][index % 3]
                    }`}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.user?.name || "-"}</td>
                  <td className="px-4 py-2">{item.user?.email || "-"}</td>
                  <td className="px-4 py-2">{item.payment_type}</td>
                  <td className="px-4 py-2">₹{item.amount}</td>
                  <td className="px-4 py-2">{item.razorpay_payment_id}</td>
                  <td className="px-4 py-2">{item.status}</td>
                  <td className="px-4 py-2 font-mono">
                    {format(parseISO(item.created_at), "yyyy-MM-dd")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
