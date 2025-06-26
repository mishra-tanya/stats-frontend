import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { StatsCard } from "../../charts/StatsCard";
import {
  Users,
  Mail,
  Award,
  CreditCard,
  DollarSign,
  BarChart2,
  BookOpen,
  MessageSquare,
} from "lucide-react";

const API_MAP: Record<string, string> = {
  daily: "db4/daily-stats",
  weekly: "db4/weekly-stats",
  monthly: "db4/monthly-stats",
};

const STAT_CONFIG: Record<
  string,
  {
    title: string;
    icon: any;
    colorScheme?: "green" | "blue" | "red" | "violet";
    description?: string;
  }
> = {
  registered_users: {
    title: "Registered Users",
    icon: Users,
    colorScheme: "violet",
  },
  contact_messages: {
    title: "Contact Messages",
    icon: MessageSquare,
    colorScheme: "blue",
  },
  goal: {
    title: "Goals Created",
    icon: Award,
    colorScheme: "green",
  },
  goal_test: {
    title: "Goal Tests",
    icon: BookOpen,
    colorScheme: "blue",
  },
  payment: {
    title: "Payments",
    icon: CreditCard,
    colorScheme: "red",
  },
  total_revenue: {
    title: "Total Revenue",
    icon: DollarSign,
    colorScheme: "green",
  },
  Db3Result: {
    title: "Results",
    icon: BarChart2,
    colorScheme: "violet",
  },
  test_question: {
    title: "Test Questions",
    icon: BookOpen,
    colorScheme: "blue",
  },
};

export default function StatsOverview() {
  const [filter, setFilter] = useState<"daily" | "weekly" | "monthly">("daily");

  const { data, loading, error } = useFetch<any>(API_MAP[filter]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-violet-700">
          Stats Overview ({filter.charAt(0).toUpperCase() + filter.slice(1)})
        </h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "daily" | "weekly" | "monthly")}
          className="border px-4 py-2 rounded text-sm bg-white dark:bg-gray-800 dark:text-white"
        >
          <option value="daily">Today</option>
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {data && typeof data === "object" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(data).map(([key, stat]: [string, any]) => {
            const config = STAT_CONFIG[key] || {
              title: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
              icon: Users,
              colorScheme: "violet",
            };

            return (
              <StatsCard
                key={key}
                title={config.title}
                value={stat.current}
                icon={config.icon}
                description={config.description}
                colorScheme={config.colorScheme}
                change={{
                  value: Math.abs(stat.spike_percentage || 0),
                  type:
                    stat.spike_percentage > 0
                      ? "increase"
                      : stat.spike_percentage < 0
                      ? "decrease"
                      : "",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
