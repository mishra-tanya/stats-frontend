import useFetch from "@/hooks/useFetch";
import { ChapterList } from "@/components/dashboard/content/db2/ChapterList";

export function ChapterListPage() {
  const { data, loading, error } = useFetch<any[]>("db2/notes");

  if (loading) return <p className="p-4">Loading chapters...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
  if (!data) return null;

  return <ChapterList chapters={data} />;
}
