import { useEffect, useState } from "react";
import { Activity, Users, Globe, MousePointer, Clock, Zap } from "lucide-react";
import { StatsCard } from "@/components/dashboard/charts/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const RealTime = () => {
  const [activeUsers, setActiveUsers] = useState(1247);
  const [pageViews, setPageViews] = useState(3892);
  const [currentPage, setCurrentPage] = useState("/dashboard");

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers((prev) => prev + Math.floor(Math.random() * 10) - 4);
      setPageViews((prev) => prev + Math.floor(Math.random() * 5));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const topActivePages = [
    { page: "/home", users: 234, percentage: 18.8 },
    { page: "/products", users: 198, percentage: 15.9 },
    { page: "/dashboard", users: 167, percentage: 13.4 },
    { page: "/blog", users: 142, percentage: 11.4 },
    { page: "/pricing", users: 98, percentage: 7.9 },
  ];

  const trafficSources = [
    { source: "Direct", users: 412, color: "bg-blue-500" },
    { source: "Google Search", users: 328, color: "bg-green-500" },
    { source: "Social Media", users: 287, color: "bg-purple-500" },
    { source: "Referral", users: 134, color: "bg-orange-500" },
    { source: "Email", users: 86, color: "bg-pink-500" },
  ];

  const geographicData = [
    { country: "United States", users: 345, flag: "🇺🇸" },
    { country: "United Kingdom", users: 198, flag: "🇬🇧" },
    { country: "Germany", users: 167, flag: "🇩🇪" },
    { country: "Canada", users: 142, flag: "🇨🇦" },
    { country: "Australia", users: 98, flag: "🇦🇺" },
  ];

  return (
    <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-green-50/30 to-background dark:via-green-950/10">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 via-emerald-50/30 to-green-50/30 dark:from-green-950/10 dark:via-emerald-950/10 dark:to-green-950/10 rounded-2xl -z-10" />

        <div className="flex items-center gap-3">
          <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-clip-text text-transparent">
            Real-time Analytics
          </h1>
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200 animate-pulse"
          >
            LIVE
          </Badge>
        </div>
        <p className="text-muted-foreground text-lg mt-2">
          Monitor your website activity in real-time as it happens
        </p>
      </div>

      {/* Real-time Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Users Right Now"
          value={activeUsers}
          icon={Users}
          description="Users currently on your site"
          colorScheme="green"
        />
        <StatsCard
          title="Page Views (Last Hour)"
          value={pageViews}
          icon={Activity}
          description="Total page views in the last hour"
          colorScheme="blue"
        />
        <StatsCard
          title="Avg. Session Duration"
          value="4:23"
          icon={Clock}
          description="Current average session time"
          colorScheme="purple"
        />
        <StatsCard
          title="Bounce Rate"
          value="28.4%"
          icon={MousePointer}
          description="Current bounce rate"
          colorScheme="orange"
        />
      </div>

      {/* Real-time Data Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Active Pages */}
        <Card className="border-2 border-dashed border-green-200 dark:border-green-800 bg-gradient-to-br from-background to-green-50/20 dark:to-green-950/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <CardTitle className="text-green-700 dark:text-green-300">
                Top Active Pages
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topActivePages.map((page, index) => (
                <div key={page.page} className="flex items-center gap-3">
                  <span className="text-sm font-mono w-16">{page.page}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">
                        {page.users} users
                      </span>
                      <span className="text-xs font-semibold">
                        {page.percentage}%
                      </span>
                    </div>
                    <Progress value={page.percentage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="border-2 border-dashed border-blue-200 dark:border-blue-800 bg-gradient-to-br from-background to-blue-50/20 dark:to-blue-950/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <CardTitle className="text-blue-700 dark:text-blue-300">
                Traffic Sources
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trafficSources.map((source, index) => (
                <div
                  key={source.source}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("h-3 w-3 rounded-full", source.color)} />
                    <span className="text-sm font-medium">{source.source}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      {source.users}
                    </span>
                    <span className="text-xs text-muted-foreground">users</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Data */}
        <Card className="border-2 border-dashed border-purple-200 dark:border-purple-800 bg-gradient-to-br from-background to-purple-50/20 dark:to-purple-950/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <CardTitle className="text-purple-700 dark:text-purple-300">
                Top Countries
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {geographicData.map((country, index) => (
                <div
                  key={country.country}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{country.flag}</span>
                    <span className="text-sm font-medium">
                      {country.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      {country.users}
                    </span>
                    <span className="text-xs text-muted-foreground">users</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Activity Feed */}
      <Card className="border-2 border-dashed border-orange-200 dark:border-orange-800 bg-gradient-to-br from-background to-orange-50/20 dark:to-orange-950/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-orange-600 dark:text-orange-400 animate-pulse" />
            <CardTitle className="text-orange-700 dark:text-orange-300">
              Live Activity Feed
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 opacity-100">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <span>
                User from <strong>New York</strong> viewed{" "}
                <strong>/products/laptop</strong>
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                just now
              </span>
            </div>
            <div className="flex items-center gap-2 opacity-80">
              <div className="h-2 w-2 bg-blue-500 rounded-full" />
              <span>
                User from <strong>London</strong> signed up for newsletter
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                5s ago
              </span>
            </div>
            <div className="flex items-center gap-2 opacity-60">
              <div className="h-2 w-2 bg-purple-500 rounded-full" />
              <span>
                User from <strong>Tokyo</strong> completed purchase
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                12s ago
              </span>
            </div>
            <div className="flex items-center gap-2 opacity-40">
              <div className="h-2 w-2 bg-orange-500 rounded-full" />
              <span>
                User from <strong>Sydney</strong> viewed{" "}
                <strong>/blog/latest-news</strong>
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                18s ago
              </span>
            </div>
            <div className="flex items-center gap-2 opacity-20">
              <div className="h-2 w-2 bg-pink-500 rounded-full" />
              <span>
                User from <strong>Berlin</strong> started free trial
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                25s ago
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTime;
