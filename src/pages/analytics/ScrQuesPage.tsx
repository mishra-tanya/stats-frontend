import { QuestionList } from "@/components/dashboard/content/db2/ScrQuestion";

export default function QuestionPage() {
  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold text-center mt-3 mb-6">SCR Questions</h1>
      <QuestionList />
    </div>
  );
}
