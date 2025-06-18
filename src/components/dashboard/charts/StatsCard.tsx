import { TrendingUp, TrendingDown } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  colorScheme?: "blue" | "green" | "purple" | "orange" | "pink" | "cyan";
}

const colorSchemes = {
  blue: {
    border: "border-blue-200 dark:border-blue-800",
    gradient: "from-blue-500/20 via-blue-400/10 to-transparent",
    iconBg: "bg-blue-50 dark:bg-blue-950/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    shadow: "shadow-blue-100 dark:shadow-blue-900/20",
  },
  green: {
    border: "border-green-200 dark:border-green-800",
    gradient: "from-green-500/20 via-green-400/10 to-transparent",
    iconBg: "bg-green-50 dark:bg-green-950/50",
    iconColor: "text-green-600 dark:text-green-400",
    shadow: "shadow-green-100 dark:shadow-green-900/20",
  },
  purple: {
    border: "border-purple-200 dark:border-purple-800",
    gradient: "from-purple-500/20 via-purple-400/10 to-transparent",
    iconBg: "bg-purple-50 dark:bg-purple-950/50",
    iconColor: "text-purple-600 dark:text-purple-400",
    shadow: "shadow-purple-100 dark:shadow-purple-900/20",
  },
  orange: {
    border: "border-orange-200 dark:border-orange-800",
    gradient: "from-orange-500/20 via-orange-400/10 to-transparent",
    iconBg: "bg-orange-50 dark:bg-orange-950/50",
    iconColor: "text-orange-600 dark:text-orange-400",
    shadow: "shadow-orange-100 dark:shadow-orange-900/20",
  },
  pink: {
    border: "border-pink-200 dark:border-pink-800",
    gradient: "from-pink-500/20 via-pink-400/10 to-transparent",
    iconBg: "bg-pink-50 dark:bg-pink-950/50",
    iconColor: "text-pink-600 dark:text-pink-400",
    shadow: "shadow-pink-100 dark:shadow-pink-900/20",
  },
  cyan: {
    border: "border-cyan-200 dark:border-cyan-800",
    gradient: "from-cyan-500/20 via-cyan-400/10 to-transparent",
    iconBg: "bg-cyan-50 dark:bg-cyan-950/50",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    shadow: "shadow-cyan-100 dark:shadow-cyan-900/20",
  },
};

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  description,
  colorScheme = "blue",
}: StatsCardProps) {
  const scheme = colorSchemes[colorScheme];

  const formatValue = (val: string | number) => {
    if (typeof val === "number") {
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
        "border-2 border-dashed",
        scheme.border,
        scheme.shadow,
        "bg-gradient-to-br from-background to-background/50",
        "backdrop-blur-sm",
      )}
    >
      {/* Gradient Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-50",
          scheme.gradient,
        )}
      />

      {/* Animated Border */}
      <div
        className={cn(
          "absolute inset-0 rounded-lg bg-gradient-to-r opacity-20",
          colorScheme === "blue" && "from-blue-400 via-purple-400 to-blue-400",
          colorScheme === "green" &&
            "from-green-400 via-emerald-400 to-green-400",
          colorScheme === "purple" &&
            "from-purple-400 via-pink-400 to-purple-400",
          colorScheme === "orange" &&
            "from-orange-400 via-red-400 to-orange-400",
          colorScheme === "pink" && "from-pink-400 via-rose-400 to-pink-400",
          colorScheme === "cyan" && "from-cyan-400 via-blue-400 to-cyan-400",
        )}
        style={{
          // animation: "shimmer 3s ease-in-out infinite",
          background: `linear-gradient(45deg, transparent 30%,  50%, transparent 70%)`,
        }}
      />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div
          className={cn(
            "h-9 w-9 rounded-xl flex items-center justify-center transition-all duration-300",
            "shadow-sm hover:shadow-md",
            scheme.iconBg,
          )}
        >
          <Icon
            className={cn(
              "h-4 w-4 transition-colors duration-300",
              scheme.iconColor,
            )}
          />
        </div>
      </CardHeader>

      <CardContent className="relative z-10">
        <div className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
          {formatValue(value)}
        </div>

        {change && (
          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full",
                change.type === "increase"
                  ? "bg-green-50 dark:bg-green-950/30"
                  : "bg-red-50 dark:bg-red-950/30",
              )}
            >
              {change.type === "increase" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span
                className={cn(
                  "font-medium",
                  change.type === "increase"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400",
                )}
              >
                {change.value > 0 ? "+" : ""}
                {change.value}%
              </span>
            </div>
            <span className="ml-2">from last month</span>
          </div>
        )}

        {description && (
          <p className="text-xs text-muted-foreground mt-2 font-medium">
            {description}
          </p>
        )}
      </CardContent>

     
    </Card>
  );
}
