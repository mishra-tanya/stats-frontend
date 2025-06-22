import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, FileText, Tag } from "lucide-react";

interface FlashcardData {
  id: number;
  title: string;
  front: string;
  back: string;
  page_url: string;
  lo_test: string;
}

export function FlashcardAccordion({ flashcard }: { flashcard: FlashcardData }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-pink-300 dark:border-violet-700 rounded-xl shadow-sm overflow-hidden mb-4 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-500 text-white font-semibold text-lg hover:brightness-105 focus:outline-none"
      >
        <div className="flex items-center gap-2">
          {flashcard.front}
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {!isOpen && (
        <div className="px-5 py-3 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm">
          <p className="font-semibold mb-1 text-violet-700 dark:text-violet-300">Q: Front</p>
          <p className="whitespace-pre-line mb-2">{flashcard.front}</p>
          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
            <Tag size={12} />
            {flashcard.page_url}
          </span>
        </div>
      )}

      {isOpen && (
        <div className="bg-white dark:bg-gray-900 px-6 py-4 space-y-4 animate-fade-in-down text-sm text-gray-800 dark:text-gray-200">
          <div>
            <p className="font-semibold text-purple-700 dark:text-purple-300">A: Back Side</p>
            <p className="mt-1 whitespace-pre-line">{flashcard.back}</p>
          </div>

          <div className="text-xs text-right text-gray-500 dark:text-gray-400 mt-2">
            <FileText size={14} className="inline-block mr-1" />
            <span>URL: {flashcard.page_url} | Test: {flashcard.lo_test}</span>
          </div>
        </div>
      )}
    </div>
  );
}
