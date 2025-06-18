import {
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Clock,
  Globe,
} from "lucide-react";
import { StatsCard } from "../charts/StatsCard";
import { DashboardAreaChart } from "../charts/AreaChart";
import { DashboardPieChart } from "../charts/PieChart";
import { DataTable } from "../charts/DataTable";

export function AnalyticsOverviewContent() {
  const analyticsData = {
    stats: {
      totalVisitors: 234567,
      pageViews: 892341,
      avgSessionDuration: "3:24",
      bounceRate: 34.5,
    },
    chartData: {
      area: [
        { name: "Jan", users: 5200, pageviews: 12400, date: "2024-01" },
        { name: "Feb", users: 4800, pageviews: 11200, date: "2024-02" },
        { name: "Mar", users: 6100, pageviews: 15300, date: "2024-03" },
        { name: "Apr", users: 7200, pageviews: 17800, date: "2024-04" },
        { name: "May", users: 6900, pageviews: 16900, date: "2024-05" },
        { name: "Jun", users: 8100, pageviews: 19200, date: "2024-06" },
      ],
      pie: [
        { name: "Direct", value: 35, fill: "hsl(var(--chart-1))" },
        { name: "Organic Search", value: 28, fill: "hsl(var(--chart-2))" },
        { name: "Social Media", value: 20, fill: "hsl(var(--chart-3))" },
        { name: "Referral", value: 12, fill: "hsl(var(--chart-4))" },
        { name: "Email", value: 5, fill: "hsl(var(--chart-5))" },
      ],
    },
    topPages: [
      {
        id: "1",
        page: "/home",
        views: 45623,
        users: 32190,
        bounceRate: 28,
        avgTime: "4:12",
      },
      {
        id: "2",
        page: "/products",
        views: 38291,
        users: 27842,
        bounceRate: 35,
        avgTime: "3:45",
      },
      {
        id: "3",
        page: "/blog",
        views: 29483,
        users: 21756,
        bounceRate: 22,
        avgTime: "5:38",
      },
      {
        id: "4",
        page: "/about",
        views: 18392,
        users: 14823,
        bounceRate: 48,
        avgTime: "2:15",
      },
      {
        id: "5",
        page: "/contact",
        views: 12847,
        users: 9234,
        bounceRate: 41,
        avgTime: "3:02",
      },
    ],
  };

  return (
    <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-blue-50/30 to-background dark:via-blue-950/10">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/30 to-blue-50/30 dark:from-blue-950/10 dark:via-purple-950/10 dark:to-blue-950/10 rounded-2xl -z-10" />

        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          Analytics Overview
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Comprehensive insights into your website performance and user behavior
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Visitors"
          value={analyticsData.stats.totalVisitors}
          change={{ value: 18.2, type: "increase" }}
          icon={Users}
          description="Unique visitors this month"
          colorScheme="blue"
        />
        <StatsCard
          title="Page Views"
          value={analyticsData.stats.pageViews}
          change={{ value: 12.5, type: "increase" }}
          icon={Eye}
          description="Total page views"
          colorScheme="green"
        />
        <StatsCard
          title="Avg. Session Duration"
          value={analyticsData.stats.avgSessionDuration}
          change={{ value: 8.3, type: "increase" }}
          icon={Clock}
          description="Average time on site"
          colorScheme="purple"
        />
        <StatsCard
          title="Bounce Rate"
          value={`${analyticsData.stats.bounceRate}%`}
          change={{ value: -5.2, type: "decrease" }}
          icon={MousePointer}
          description="Visitors who leave quickly"
          colorScheme="orange"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardAreaChart
          data={analyticsData.chartData.area}
          title="Website Traffic Trends"
          description="User visits and page views over the last 6 months"
        />
        <DashboardPieChart
          data={analyticsData.chartData.pie}
          title="Traffic Sources"
          description="Where your visitors are coming from"
        />
      </div>

      {/* Top Pages Table */}
      <DataTable
        data={analyticsData.topPages}
        title="Top Performing Pages"
        description="Your most visited pages and their performance metrics"
      />
    </div>
  );
}
