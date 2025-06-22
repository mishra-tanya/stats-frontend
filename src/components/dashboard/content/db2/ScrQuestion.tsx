import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { QuestionCard } from "./common/QuestionList";

function convertToCSV(data: any[]) {
  const headers = [
    "#",
    "Question",
    "Option A",
    "Option B",
    "Option C",
    "Option D",
    "Correct Answer",
    "Reason",
    "Test",
  ];
  const rows = data.map((q, index) => [
    index + 1,
    q.question_title,
    q.option_a,
    q.option_b,
    q.option_c,
    q.option_d,
    q.result_ans,
    q.reason,
    q.test,
  ]);
  return [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))
  ].join("\n");
}

export function QuestionList() {
  const { data, loading, error } = useFetch<any>("db2/scr-question");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(10); 

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const filtered = data.filter(
        (q) =>
          q.question_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.option_a?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.option_b?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.option_c?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.option_d?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredQuestions(filtered);
    }
  }, [data, searchTerm]);

  const downloadCSV = () => {
    const csv = convertToCSV(filteredQuestions);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "all_questions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const loadMore = () => setVisibleCount((prev) => prev + 10);

  if (loading) return <p className="p-4">Loading questions...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search questions or options..."
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

      {/* Display Questions */}
      {filteredQuestions.slice(0, visibleCount).map((q) => (
        <QuestionCard key={q.id} {...q} />
      ))}

      {/* Load More Button */}
      {visibleCount < filteredQuestions.length && (
        <div className="text-center mt-4">
          <button
            onClick={loadMore}
            className="px-6 py-2 text-sm font-medium border border-violet-400 text-violet-700 rounded-full hover:bg-violet-50 dark:text-violet-200 dark:hover:bg-violet-800"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
