import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

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
  name: string;
  users: number;
  revenue: number;
  date: string;
}

interface DashboardAreaChartProps {
  data: AreaChartData[];
  title: string;
  description?: string;
}

const chartConfig = {
  users: {
    label: "Users",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
};

export function DashboardAreaChart({
  data,
  title,
  description,
}: DashboardAreaChartProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01]",
        "border-2 border-dashed border-gradient-to-r",
        "from-blue-200 via-purple-200 to-pink-200",
        "dark:from-blue-800/50 dark:via-purple-800/50 dark:to-pink-800/50",
        "bg-gradient-to-br from-background to-muted/20",
        "shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20",
      )}
    >
      {/* Animated Gradient Border */}
      <div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-20"
        style={{
          animation: "borderGlow 4s ease-in-out infinite",
        }}
      />

      {/* Corner Decorations */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-400/10 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-tr-full" />

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
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
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
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#revenueGradient)"
              fillOpacity={0.6}
              stroke="hsl(var(--chart-2))"
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
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--chart-2))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--chart-2))"
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
