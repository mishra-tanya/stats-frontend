import { useEffect, useState } from "react";
import { DashboardPieChart } from "../../charts/PieChart";
import useFetch from "@/hooks/useFetch";

interface PieChartData {
  name: string;
  value: number;
  fill: string;
}

export default function ClassWiseUsersChart() {
  const { data, loading, error } = useFetch<any>("db3/class-wise");
  const [chartData, setChartData] = useState<PieChartData[]>([]);

  useEffect(() => {
    if (data && data.success && Array.isArray(data)) {
      const parsed: PieChartData[] = data.map((item: any, index: number) => ({
        name: `Class ${index + 1}`,
        value: item.value,
        fill: item.fill,
      }));
      setChartData(parsed);
    }
  }, [data]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading pie chart.</p>;

  return (
    <div className="p-4">
      <DashboardPieChart
        data={data}
        title="Class-wise User Distribution"
        description="Total users registered in each class"
      />
    </div>
  );
}
