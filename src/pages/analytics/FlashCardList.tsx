import { FlashcardListWithSearch } from "@/components/dashboard/content/db2/FlashcardListWithSearch";
import useFetch from "@/hooks/useFetch";

export default function FlashcardPage() {
  const { data, loading, error } = useFetch<any>("db2/flash-question");

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return <FlashcardListWithSearch data={data || []} />;
}
