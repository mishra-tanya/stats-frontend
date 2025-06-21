import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";

function convertToCSV(data: any[]) {
  const headers = ["#", "Category", "Title", "URL Link", "Action"];
  const rows = data.map((cat, index) => [
    index + 1,
    cat.cat_name,
    cat.title,
    cat.url_link,
    cat.action,
  ]);
  return [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n");
}

export function CategoryTable() {
  const { data, loading, error } = useFetch<any[]>("db1/get-blog-categories");

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const term = searchTerm.toLowerCase();
      const filtered = data.filter(
        (cat) =>
          cat.cat_name?.toLowerCase().includes(term) ||
          cat.title?.toLowerCase().includes(term) ||
          cat.url_link?.toLowerCase().includes(term)
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  const downloadCSV = () => {
    const csv = convertToCSV(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "category_directory.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="relative p-6 overflow-x-auto">
      {/* Background design */}
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

      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
          Category Directory
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by category, title, or URL..."
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
                <th className="px-4 py-2 font-bold text-violet-700 dark:text-violet-300">#</th>
                <th className="px-4 py-2 font-bold text-fuchsia-700 dark:text-fuchsia-300">Category</th>
                <th className="px-4 py-2 font-bold text-purple-700 dark:text-purple-300">Title</th>
                <th className="px-4 py-2 font-bold text-violet-700 dark:text-violet-300">URL Link</th>
                <th className="px-4 py-2 font-bold text-purple-700 dark:text-purple-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((cat: any, index: number) => (
                <tr
                  key={cat.id}
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
                  <td className="px-4 py-2 font-medium capitalize">{cat.cat_name}</td>
                  <td className="px-4 py-2 font-mono">{cat.title}</td>
                  <td className="px-4 py-2 font-mono text-blue-600">{cat.url_link}</td>
                  <td className="px-4 py-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      {cat.action}
                    </span>
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
