import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface PieChartData {
  name: string;
  value: number;
  fill: string;
}

interface DashboardPieChartProps {
  data: PieChartData[];
  title: string;
  description?: string;
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  tablet: {
    label: "Tablet",
    color: "hsl(var(--chart-3))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-4))",
  },
};

export function DashboardPieChart({
  data,
  title,
  description,
}: DashboardPieChartProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01]",
        "border-2 border-dashed",
        "border-gradient-to-r from-emerald-200 via-cyan-200 to-blue-200",
        "dark:from-emerald-800/50 dark:via-cyan-800/50 dark:to-blue-800/50",
        "bg-gradient-to-br from-background to-muted/20",
        "shadow-lg hover:shadow-emerald-100 dark:hover:shadow-emerald-900/20",
      )}
    >
      {/* Animated Gradient Border */}
      <div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 opacity-20"
        style={{
          animation: "borderPulse 3s ease-in-out infinite",
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-ping" />
      <div className="absolute bottom-2 left-2 w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse" />

      {/* Geometric Patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5">
        <div className="absolute top-4 left-4 w-8 h-8 border-2 border-emerald-400 rounded-full" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-cyan-400 rotate-45" />
        <div className="absolute top-1/2 right-8 w-4 h-4 bg-blue-400 rounded-full" />
      </div>

      <CardHeader className="relative z-10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce" />
            <div className="h-2 w-2 rounded-full bg-cyan-500 animate-bounce animation-delay-100" />
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce animation-delay-200" />
          </div>
          <CardTitle className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent font-bold">
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
        <ChartContainer config={chartConfig} className="h-[500px]">
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="name" hideLabel />}
            />
            <Pie
              dataKey="value"
              data={data}
              innerRadius={140}
              strokeWidth={3}
              stroke="hsl(var(--background))"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  className="hover:opacity-80 transition-opacity duration-300"
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <style jsx>{`
        @keyframes borderPulse {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.01);
          }
        }
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </Card>
  );
}
