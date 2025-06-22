import { useEffect, useState } from "react";
import { ChapterDetailCard } from "./ChapterDetailCard";
import { Download } from "lucide-react";

interface ChapterData {
  id: number;
  title: string;
  code: string;
  page_url: string;
  pdf_file: string;
  status: string;
}

function convertToCSV(data: ChapterData[]) {
  const headers = ["ID", "Title", "Page URL", "PDF File", "Status"];
  const rows = data.map((chapter) => [
    chapter.id,
    chapter.title,
    chapter.page_url,
    chapter.pdf_file,
    chapter.status,
  ]);
  return [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n");
}

export function ChapterList({ chapters }: { chapters: ChapterData[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChapters, setFilteredChapters] = useState<ChapterData[]>([]);

  useEffect(() => {
    const filtered = chapters.filter(
      (c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.page_url.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredChapters(filtered);
  }, [chapters, searchTerm]);

  const downloadCSV = () => {
    const csv = convertToCSV(filteredChapters);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "chapters.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title or page URL..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-2/3 px-4 py-2 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={downloadCSV}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
        >
          <Download size={16} />
          Download CSV
        </button>
      </div>

      {filteredChapters.length === 0 ? (
        <p className="text-gray-500 text-center">No chapters found.</p>
      ) : (
        filteredChapters.map((chapter) => (
          <ChapterDetailCard key={chapter.id} chapter={chapter} />
        ))
      )}
    </div>
  );
}
