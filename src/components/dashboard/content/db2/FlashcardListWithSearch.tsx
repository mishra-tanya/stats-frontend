import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, BookOpen, FileText, Download, Search } from "lucide-react";

interface FlashcardData {
  id: number;
  title: string;
  front: string;
  back: string;
  page_url: string;
  lo_test: string;
}

function FlashcardAccordion({ flashcard, index }: { flashcard: FlashcardData; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all shadow-sm border-violet-300 dark:border-violet-700 ${
        [
          "bg-blue-50 dark:bg-blue-900/10",
          "bg-fuchsia-50 dark:bg-fuchsia-900/10",
          "bg-purple-50 dark:bg-purple-900/10",
        ][index % 3]
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-violet-500  to-purple-500 text-white font-semibold text-lg"
      >
        <div className="flex items-center gap-2">
          <BookOpen size={20} /> {flashcard.front}
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <div className="px-6 py-4 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-200 space-y-4">
          <div>
            <p className="font-semibold text-violet-700 dark:text-violet-300">Q: Front</p>
            <p className="whitespace-pre-line">{flashcard.front}</p>
          </div>
          <div>
            <p className="font-semibold text-purple-700 dark:text-purple-300">A: Back</p>
            <p className="whitespace-pre-line">{flashcard.back}</p>
          </div>
          <div className="text-xs text-right text-gray-500 dark:text-gray-400 mt-2">
            <FileText size={14} className="inline-block mr-1" />
            URL: {flashcard.page_url} | Test: {flashcard.lo_test}
          </div>
        </div>
      )}
    </div>
  );
}

function convertToCSV(data: FlashcardData[]) {
  const headers = ["#", "Title", "Front", "Back", "Page URL", "Test"];
  const rows = data.map((card, i) => [
    i + 1,
    card.title,
    card.front,
    card.back,
    card.page_url,
    card.lo_test,
  ]);
  return [headers.join(","), ...rows.map((r) => r.map((cell) => `"${cell}"`).join(","))].join("\n");
}

export function FlashcardListWithSearch({ data }: { data: FlashcardData[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<FlashcardData[]>([]);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const filtered = data.filter(
      (card) =>
        card.title.toLowerCase().includes(lower) ||
        card.front.toLowerCase().includes(lower) ||
        card.back.toLowerCase().includes(lower) ||
        card.lo_test.toLowerCase().includes(lower) ||
        card.page_url.toLowerCase().includes(lower)
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const downloadCSV = () => {
    const csv = convertToCSV(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "flashcards.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-2/3">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search flashcards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-violet-300 rounded-lg focus:ring-2 focus:ring-violet-400 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <button
          onClick={downloadCSV}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
        >
          <Download size={16} /> Download CSV
        </button>
      </div>

      {filteredData.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">No flashcards found.</p>
      )}

      {filteredData.map((card, i) => (
        <FlashcardAccordion key={card.id} flashcard={card} index={i} />
      ))}
    </div>
  );
}
