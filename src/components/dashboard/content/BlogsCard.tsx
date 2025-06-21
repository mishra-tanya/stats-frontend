import { useState } from "react";
import { ExternalLink, FileText, Calendar, Tag, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

function stripHTML(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export function BlogCard({ blog }: { blog: any }) {
  const [showMore, setShowMore] = useState(false);

  const {
    title,
    category,
    date,
    action,
    url_link,
    description,
    description1,
    description2,
    description3,
    user_post,
    catalog_pdf,
  } = blog;

  return (
    <div className="relative transition-all duration-300 transform hover:scale-[1.01] rounded-xl border border-violet-200 dark:border-violet-700 p-6 mb-6 bg-white dark:bg-gray-900 shadow-md hover:shadow-xl">
      <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h2>

      <div className="flex flex-wrap gap-3 text-sm text-gray-700 dark:text-gray-300 mb-4">
        <span className="flex items-center gap-1 bg-violet-100 dark:bg-violet-800 text-violet-700 dark:text-violet-200 px-2 py-1 rounded-full">
          <Tag size={14} /> {category}
        </span>
        <span className="flex items-center gap-1 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-200 px-2 py-1 rounded-full">
          <Calendar size={14} /> {date}
        </span>
        <span className="flex items-center gap-1 bg-fuchsia-100 dark:bg-fuchsia-800 text-fuchsia-700 dark:text-fuchsia-200 px-2 py-1 rounded-full">
          <CheckCircle size={14} /> {action}
        </span>
        <span className="flex items-center gap-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-2 py-1 rounded-full">
          <ExternalLink size={14} /> {url_link}
        </span>
        <span className="flex items-center gap-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-2 py-1 rounded-full">
          <ExternalLink size={14} />{" "}
          <a
            href={`https://indiaesg.org/blog_details/${url_link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Web Link
          </a>
        </span>
      </div>

      {showMore && (
        <div className="text-sm text-gray-800 dark:text-gray-200 space-y-3 mt-2 animate-fade-in-down">
          {description && (
            <p>
              <strong>Description:</strong> {stripHTML(description)}
            </p>
          )}
          {description1 && (
            <p>
              <strong>More Info:</strong> {stripHTML(description1)}
            </p>
          )}
          {description2 && (
            <p>
              <strong>Extra Info:</strong> {stripHTML(description2)}
            </p>
          )}
          {description3 && (
            <p>
              <strong>Additional Notes:</strong> {stripHTML(description3)}
            </p>
          )}
          {user_post && (
            <p>
              <strong>Posted by:</strong> {user_post}
            </p>
          )}
          {catalog_pdf && (
            <p>
              <strong>PDF:</strong>{" "}
              <a
                href={`https://indiaesg.org/uploads/catalog/${catalog_pdf}`}
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
              >
                {catalog_pdf}
              </a>
            </p>
          )}
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="px-5 py-2 text-sm font-medium border rounded-full transition-colors duration-300 text-violet-700 border-violet-400 hover:bg-violet-50 dark:text-violet-200 dark:hover:bg-violet-800"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
}
