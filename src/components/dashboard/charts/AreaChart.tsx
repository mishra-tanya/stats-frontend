import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { cn } from "@/lib/utils";

interface AreaChartData {
  name: string; // This will be used on X-axis
  users: number;
  date: string;
}

interface DashboardAreaChartProps {
  data: AreaChartData[];
  title: string;
  description?: string;
  range: string; // Accept "7", "15", "30", "90", "180", "365"
}

const chartConfig = {
  users: {
    label: "Users",
    color: "hsl(var(--chart-1))",
  },
};

export function DashboardAreaChart({
  data,
  title,
  description,
  range,
}: DashboardAreaChartProps) {
  // Dynamic formatter
  const formatXAxisLabel = (value: string) => {
    if (["7", "15", "30"].includes(range)) {
      return value; // expected: date string (e.g., "Jun 01")
    } else if (["90", "180"].includes(range)) {
      return `W${value}`; // expected: week number (e.g., "23")
    } else if (range === "365") {
      return value.slice(0, 3); // expected: "Jan", "Feb", etc.
    }
    return value;
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01]",
        "border-2 border-dashed border-gradient-to-r",
        "from-blue-200 via-purple-200 to-pink-200",
        "dark:from-blue-800/50 dark:via-purple-800/50 dark:to-pink-800/50",
        "bg-gradient-to-br from-background to-muted/20",
        "shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20"
      )}
    >
      <div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-20"
        style={{
          animation: "borderGlow 4s ease-in-out infinite",
        }}
      />

      <CardHeader className="relative z-10">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
          <CardTitle className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
            {title}
          </CardTitle>
        </div>
        {description && (
          <CardDescription className="text-muted-foreground/80">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="relative z-10">
        <ChartContainer config={chartConfig} className="h-[350px]">
          <AreaChart data={data} margin={{ left: 12, right: 12 }}>
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatXAxisLabel}
              className="text-xs text-muted-foreground"
            />
            <YAxis hide />
            <ChartTooltip
              cursor={{
                stroke: "hsl(var(--primary))",
                strokeWidth: 2,
                strokeDasharray: "5,5",
              }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="users"
              type="natural"
              fill="url(#usersGradient)"
              fillOpacity={0.6}
              stroke="hsl(var(--chart-1))"
              strokeWidth={3}
              stackId="a"
            />
            <defs>
              <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <style jsx>{`
        @keyframes borderGlow {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.02);
          }
        }
      `}</style>
    </Card>
  );
}
