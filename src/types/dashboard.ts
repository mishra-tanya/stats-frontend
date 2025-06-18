export interface Website {
  id: string;
  name: string;
  type: "analytics" | "scr" | "olympiad" | "computation";
  color: string;
}

export interface DashboardData {
  stats: {
    totalUsers: number;
    revenue: number;
    pageViews: number;
    conversionRate: number;
  };
  chartData: {
    area: Array<{
      name: string;
      users: number;
      revenue: number;
      date: string;
    }>;
    pie: Array<{
      name: string;
      value: number;
      fill: string;
    }>;
  };
  tableData: Array<{
    id: string;
    page: string;
    views: number;
    users: number;
    bounceRate: number;
    avgTime: string;
  }>;
}

export interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  items?: SidebarItem[];
}
