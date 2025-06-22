import { useState } from "react";
import { ChevronDown, ChevronUp, FileText, Code2, Link } from "lucide-react";

interface ChapterData {
  id: number;
  title: string;
  code: string;
  page_url: string;
  pdf_file: string;
  status: string;
}

export function ChapterDetailCard({ chapter }: { chapter: ChapterData }) {
  const [isOpen, setIsOpen] = useState(false);

  const decodeHTML = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="border border-violet-300 dark:border-violet-700 rounded-xl shadow-sm overflow-hidden mb-4 transition-all">
      <div className="flex justify-between items-center px-5 py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-white font-semibold text-lg">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText size={20} />
              {chapter.title}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2 text-xs font-normal">
            <span className="bg-white/20 px-2 py-1 rounded-full flex items-center gap-1 text-white">
              <Link size={12} />
              {chapter.page_url}
            </span>
             <span className="bg-white/20 px-2 py-1 rounded-full flex items-center gap-1 text-white">
              {chapter.status}
            </span>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="bg-white dark:bg-gray-900 px-6 py-4 text-sm text-gray-800 dark:text-gray-200 space-y-3 animate-fade-in-down">
          <div className="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-300 font-semibold">
            <Code2 size={16} />
            <span>Chapter Content</span>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md max-h-[500px] overflow-y-auto text-sm whitespace-pre-wrap">
            {decodeHTML(chapter.code)}
          </div>
        </div>
      )}
    </div>
  );
}
