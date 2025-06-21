import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { BlogCard } from "./BlogsCard";

const convertToCSV = (blogs: any[]) => {
  const headers = [
    "id", "cat_id", "sub_id", "title", "url_link", "category", "image",
    "description", "description1", "description2", "description3", "date",
    "page_image", "page_image1", "page_image2", "page_image3",
    "video_link", "user_post", "catalog_pdf", "action"
  ];

  const rows = blogs.map((blog) =>
    headers.map((header) => {
      const value = blog[header] ?? "";
      return `"${String(value).replace(/"/g, '""')}"`; 
    })
  );

  return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
};

export function BlogList() {
  const { data, loading, error } = useFetch<any>("db1/get-blogs");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((blog: any) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [searchTerm, data]);

  const downloadCSV = () => {
    const csv = convertToCSV(filteredBlogs);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "blogs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p className="text-center p-6">Loading...</p>;
  if (error) return <p className="text-center p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-violet-700">Blogs</h1>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by title or category..."
          className="w-full sm:w-2/3 px-4 py-2 border border-violet-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 dark:bg-gray-800 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          onClick={downloadCSV}
          className="px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-lg shadow-md hover:bg-violet-700 transition"
        >
          Download CSV
        </button>
      </div>

      {filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">No blogs found.</p>
      ) : (
        filteredBlogs.map((blog: any) => (
          <BlogCard key={blog.id} blog={blog} />
        ))
      )}
    </div>
  );
}
