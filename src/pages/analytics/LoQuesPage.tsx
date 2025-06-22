import { LoQuestionList } from "@/components/dashboard/content/db2/LoQuestion";

export default function LoQuestionPage() {
  return (
    <div className=" mx-auto">
      <h1 className="text-3xl font-bold text-center mt-3 mb-6">Learning Objective Questions</h1>
      <LoQuestionList />
    </div>
  );
}
