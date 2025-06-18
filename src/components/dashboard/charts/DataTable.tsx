import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TableData {
  id: string;
  page: string;
  views: number;
  users: number;
  bounceRate: number;
  avgTime: string;
}

interface DataTableProps {
  data: TableData[];
  title: string;
  description?: string;
}

export function DataTable({ data, title, description }: DataTableProps) {
  const getBounceRateColor = (rate: number) => {
    if (rate < 30)
      return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300";
    if (rate < 60)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300";
    return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300";
  };

  const getRowHoverColor = (index: number) => {
    const colors = [
      "hover:bg-blue-50/50 dark:hover:bg-blue-950/20",
      "hover:bg-purple-50/50 dark:hover:bg-purple-950/20",
      "hover:bg-green-50/50 dark:hover:bg-green-950/20",
      "hover:bg-orange-50/50 dark:hover:bg-orange-950/20",
      "hover:bg-pink-50/50 dark:hover:bg-pink-950/20",
    ];
    return colors[index % colors.length];
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.005]",
        "border-2 border-dashed",
        "border-gradient-to-r from-violet-200 via-fuchsia-200 to-purple-200",
        "dark:from-violet-800/50 dark:via-fuchsia-800/50 dark:to-purple-800/50",
        "bg-gradient-to-br from-background to-muted/20",
        "shadow-lg hover:shadow-violet-100 dark:hover:shadow-violet-900/20",
      )}
    >
      {/* Animated Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, violet 2px, transparent 2px),
            radial-gradient(circle at 80% 80%, fuchsia 1px, transparent 1px),
            radial-gradient(circle at 40% 60%, purple 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px, 25px 25px, 35px 35px",
          animation: "patternMove 10s ease-in-out infinite",
        }}
      />

      {/* Gradient Border Animation */}
      <div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-400 opacity-20"
        style={{
          animation: "tableGlow 5s ease-in-out infinite",
        }}
      />

      {/* Corner Highlights */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-violet-400/20 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-fuchsia-400/20 to-transparent rounded-tl-full" />

      <CardHeader className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full animate-pulse" />
            <div className="h-2 w-2 bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-full animate-pulse animation-delay-300" />
            <div className="h-2.5 w-2.5 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full animate-pulse animation-delay-600" />
          </div>
          <CardTitle className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent font-bold">
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
        <div className="rounded-xl border-2 border-dashed border-violet-200 dark:border-violet-800 overflow-hidden bg-background/50 backdrop-blur-sm">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b-2 border-dashed border-violet-200 dark:border-violet-800">
                <TableHead className="font-bold text-violet-700 dark:text-violet-300">
                  Page
                </TableHead>
                <TableHead className="text-right font-bold text-fuchsia-700 dark:text-fuchsia-300">
                  Views
                </TableHead>
                <TableHead className="text-right font-bold text-purple-700 dark:text-purple-300">
                  Users
                </TableHead>
                <TableHead className="text-right font-bold text-violet-700 dark:text-violet-300">
                  Bounce Rate
                </TableHead>
                <TableHead className="text-right font-bold text-fuchsia-700 dark:text-fuchsia-300">
                  Avg. Time
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={item.id}
                  className={cn(
                    "transition-all duration-300 border-b border-dashed border-muted",
                    getRowHoverColor(index),
                    "hover:transform hover:scale-[1.01] hover:shadow-sm",
                  )}
                >
                  <TableCell className="font-semibold">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "h-2 w-2 rounded-full",
                          index % 5 === 0 && "bg-violet-500",
                          index % 5 === 1 && "bg-fuchsia-500",
                          index % 5 === 2 && "bg-purple-500",
                          index % 5 === 3 && "bg-indigo-500",
                          index % 5 === 4 && "bg-pink-500",
                        )}
                      />
                      {item.page}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    {item.views.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    {item.users.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="secondary"
                      className={cn(
                        getBounceRateColor(item.bounceRate),
                        "font-mono font-medium shadow-sm",
                      )}
                    >
                      {item.bounceRate}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium text-muted-foreground">
                    {item.avgTime}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <style jsx>{`
        @keyframes tableGlow {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.005);
          }
        }
        @keyframes patternMove {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(10px, -5px);
          }
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </Card>
  );
}
