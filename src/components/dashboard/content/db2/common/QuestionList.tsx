import { useState } from "react";
import {
  Tag,
  FileText,
  CheckCircle,
  BookOpen,
  ImageIcon,
  Lightbulb,
} from "lucide-react";

interface QuestionProps {
  question_no: string;
  question_title: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  result_ans: string;
  reason: string;
  test: string;
  image?: string;
}

export function QuestionCard({
  question_no,
  question_title,
  option_a,
  option_b,
  option_c,
  option_d,
  result_ans,
  reason,
  test,
  image,
}: QuestionProps) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="relative transition-all duration-300 transform hover:scale-[1.01] rounded-xl border border-violet-200 dark:border-violet-700 p-6 mb-6 bg-white dark:bg-gray-900 shadow-md hover:shadow-xl">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
        Q{question_no}: {question_title}
      </h2>

      {/* Image (optional) */}
      {image && (
        <div className="mb-4">
          <img
            src={image}
            alt={`Question ${question_no}`}
            className="rounded-lg max-w-full shadow"
          />
        </div>
      )}

      {/* Options */}
      <div className="space-y-2 text-sm text-gray-800 dark:text-gray-200 mb-4">
        <p>A. {option_a}</p>
        <p>B. {option_b}</p>
        <p>C. {option_c}</p>
        <p>D. {option_d}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-3 text-xs text-gray-700 dark:text-gray-300 mb-4">
        <span className="flex items-center gap-1 bg-violet-100 dark:bg-violet-800 text-violet-700 dark:text-violet-200 px-2 py-1 rounded-full">
          <Tag size={14} /> Test: {test}
        </span>
        <span className="flex items-center gap-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 px-2 py-1 rounded-full">
          <CheckCircle size={14} /> Answer: {result_ans}
        </span>
      </div>

      {/* Toggle Explanation */}
      {showMore && (
        <div className="text-sm text-gray-800 dark:text-gray-200 mt-3 animate-fade-in-down">
          <p className="flex items-start gap-2 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-200 p-3 rounded-lg">
            <Lightbulb size={16} className="mt-1" />
            <span>
              <strong>Explanation:</strong> {reason}
            </span>
          </p>
        </div>
      )}

      {/* Button */}
      <div className="mt-5 text-center">
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="px-5 py-2 text-sm font-medium border rounded-full transition-colors duration-300 text-violet-700 border-violet-400 hover:bg-violet-50 dark:text-violet-200 dark:hover:bg-violet-800"
        >
          {showMore ? "Hide Explanation" : "Show Explanation"}
        </button>
      </div>
    </div>
  );
}
