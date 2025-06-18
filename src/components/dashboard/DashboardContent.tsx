import { Users, DollarSign, Eye, TrendingUp } from "lucide-react";

import { StatsCard } from "./charts/StatsCard";
import { DashboardAreaChart } from "./charts/AreaChart";
import { DashboardPieChart } from "./charts/PieChart";
import { DataTable } from "./charts/DataTable";
import { DashboardData, Website } from "@/types/dashboard";

interface DashboardContentProps {
  selectedWebsite: Website;
  data: DashboardData;
}

export function DashboardContent({
  selectedWebsite,
  data,
}: DashboardContentProps) {
  return (
    <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/30 to-pink-50/30 dark:from-blue-950/10 dark:via-purple-950/10 dark:to-pink-950/10 rounded-2xl -z-10" />

        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {selectedWebsite.name} Dashboard
        </h2>
        <p className="text-muted-foreground text-lg mt-2">
          Analytics and insights for your{" "}
          <span className="font-semibold text-foreground capitalize">
            {selectedWebsite.type}
          </span>{" "}
          website
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={data.stats.totalUsers}
          change={{ value: 12.5, type: "increase" }}
          icon={Users}
          description="Active users this month"
          colorScheme="blue"
        />
        <StatsCard
          title="Revenue"
          value={`$${(data.stats.revenue / 1000).toFixed(1)}k`}
          change={{ value: 8.2, type: "increase" }}
          icon={DollarSign}
          description="Total revenue this month"
          colorScheme="green"
        />
        <StatsCard
          title="Page Views"
          value={data.stats.pageViews}
          change={{ value: -2.1, type: "decrease" }}
          icon={Eye}
          description="Total page views"
          colorScheme="purple"
        />
        <StatsCard
          title="Conversion Rate"
          value={`${data.stats.conversionRate}%`}
          change={{ value: 4.3, type: "increase" }}
          icon={TrendingUp}
          description="Conversion rate this month"
          colorScheme="orange"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardAreaChart
          data={data.chartData.area}
          title="Traffic Overview"
          description="Users and revenue trends over time"
        />
        <DashboardPieChart
          data={data.chartData.pie}
          title="Traffic Sources"
          description="Breakdown of traffic by device type"
        />
      </div>

      {/* Data Table */}
      <DataTable
        data={data.tableData}
        title="Top Pages"
        description="Most visited pages with engagement metrics"
      />
    </div>
  );
}
