import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { StatsCard } from "../../charts/StatsCard";
import {
  Users,
  Mail,
  FileText,
  CheckCircle,
  MessageSquare,
} from "lucide-react";

const API_MAP: Record<string, string> = {
  daily: "db2/daily-stats",
  weekly: "db2/weekly-stats",
  monthly: "db2/monthly-stats",
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
    icon: Mail,
    colorScheme: "blue",
  },
  learning_obj_result: {
    title: "Learning Obj Results",
    icon: FileText,
    colorScheme: "green",
  },
  results: {
    title: "Test Results",
    icon: CheckCircle,
    colorScheme: "violet",
  },
  trial_request: {
    title: "Trial Requests",
    icon: MessageSquare,
    colorScheme: "red",
  },
};

export function StatsDashboard() {
  const [filter, setFilter] = useState("daily");

  const { data, loading, error } = useFetch<any>(API_MAP[filter]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-violet-700">Stats Overview</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
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
              title: key,
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
                colorScheme="green"
                change={{
                  value: Math.abs(stat.spike_percentage || 0),
                  type:
                    stat.spike_percentage > 0
                      ? "increase"
                      : stat.spike_percentage < 0
                      ? "decrease":""
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
