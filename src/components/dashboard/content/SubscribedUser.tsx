import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";

function convertToCSV(data: any[]) {
  const headers = ["#", "Name", "Organisation", "Email"];
  const rows = data.map((user, index) => [
    index + 1,
    user.name,
    user.organisation === "NA" ? "—" : user.organisation,
    user.email,
  ]);

  return [headers.join(","), ...rows.map((r) => r.map((v) => `"${v}"`).join(","))].join("\n");
}

export function SubscribedUser() {
  const { data, loading, error } = useFetch<any[]>("db1/subscribed-users");

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const term = searchTerm.toLowerCase();
      const filtered = data.filter(
        (user) =>
          user.name?.toLowerCase().includes(term) ||
          user.organisation?.toLowerCase().includes(term) ||
          user.email?.toLowerCase().includes(term)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, data]);

  const downloadCSV = () => {
    const csv = convertToCSV(filteredUsers);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "subscribed_users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="relative p-6 overflow-x-auto">
      {/* Background animations */}
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
          Subscribed Users
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name, organisation, or email..."
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
                <th className="px-4 py-2 font-bold text-fuchsia-700 dark:text-fuchsia-300">Name</th>
                <th className="px-4 py-2 font-bold text-purple-700 dark:text-purple-300">Organisation</th>
                <th className="px-4 py-2 font-bold text-violet-700 dark:text-violet-300">Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user: any, index: number) => (
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
                  <td className="px-4 py-2 font-medium">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          ["bg-violet-500", "bg-fuchsia-500", "bg-purple-500", "bg-indigo-500", "bg-pink-500"][index % 5]
                        }`}
                      />
                      {user.name}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-muted-foreground font-mono">
                    {user.organisation === "NA" ? "—" : user.organisation}
                  </td>
                  <td className="px-4 py-2 font-mono text-blue-700 dark:text-blue-300">
                    {user.email}
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
