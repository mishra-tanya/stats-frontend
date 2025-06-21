import { useState } from "react";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Navbar } from "./Navbar";
import { EnhancedSidebar } from "./sidebar/EnhancedSidebar";
import { DashboardContent } from "./DashboardContent";
import { AnalyticsOverviewContent } from "./content/AnalyticsOverview";
import { RealTimeAnalyticsContent } from "./content/RealTimeAnalytics";
import { OrdersContent } from "./content/OrdersContent";
import { Website, DashboardData } from "@/types/dashboard";
import { ContentType } from "@/types/content";
import useDashboardData from "@/hooks/useDashboardData";
import { UsersTable } from "./content/UsersTable";
import { SubscribedUser } from "./content/SubscribedUser";
import { CategoryTable } from "./content/BlogCat";
import { MagazineTable } from "./content/Magazine";
import { BlogList } from "./content/Blogs";
import { StatsDashboard } from "./content/db2/StatsDashboard";
import { StatsDash } from "./content/db4/StatsDash";
import { UserTable } from "./content/db2/UserTable";
import { FinanceEmissionTable } from "./content/db4/FinanceEmission";
import { RegistrationChartWrapper } from "./content/db4/RegChart";
import { EmissionChartWrapper } from "./content/db4/EmissionChart";
import CountryPieChartWrapper from "./content/db2/CountryPie";

// Mock data for different website types
const mockWebsites: Website[] = [
  {
    id: "1",
    name: "IndiaESG.org",
    type: "analytics",
    color: "#3b82f6",
  },
  {
    id: "2",
    name: "SCR Preparation Tool",
    type: "scr",
    color: "#10b981",
  },
  {
    id: "3",
    name: "Sustainability Olympiad",
    type: "olympiad",
    color: "#f59e0b",
  },
  {
    id: "4",
    name: "Financed Emission Computation",
    type: "computation",
    color: "#8b5cf6",
  },
];

const generateMockData = (websiteType: Website["type"]): DashboardData => {
  const baseMultiplier = {
    analytics: 1,
    scr: 1.5,
    olympiad: 0.8,
    computation: 1.2,
  }[websiteType];

  return {
    stats: {
      totalUsers: Math.floor(45231 * baseMultiplier),
      revenue: Math.floor(89734 * baseMultiplier),
      pageViews: Math.floor(234567 * baseMultiplier),
      conversionRate: parseFloat((2.4 * baseMultiplier).toFixed(1)),
    },
    chartData: {
      area: [
        {
          name: "Jan",
          users: Math.floor(4000 * baseMultiplier),
          revenue: Math.floor(2400 * baseMultiplier),
          date: "2024-01",
        },
        {
          name: "Feb",
          users: Math.floor(3000 * baseMultiplier),
          revenue: Math.floor(1398 * baseMultiplier),
          date: "2024-02",
        },
        {
          name: "Mar",
          users: Math.floor(2000 * baseMultiplier),
          revenue: Math.floor(9800 * baseMultiplier),
          date: "2024-03",
        },
        {
          name: "Apr",
          users: Math.floor(2780 * baseMultiplier),
          revenue: Math.floor(3908 * baseMultiplier),
          date: "2024-04",
        },
        {
          name: "May",
          users: Math.floor(1890 * baseMultiplier),
          revenue: Math.floor(4800 * baseMultiplier),
          date: "2024-05",
        },
        {
          name: "Jun",
          users: Math.floor(2390 * baseMultiplier),
          revenue: Math.floor(3800 * baseMultiplier),
          date: "2024-06",
        },
      ],
      pie: [
        { name: "Desktop", value: 45, fill: "hsl(var(--chart-1))" },
        { name: "Mobile", value: 35, fill: "hsl(var(--chart-2))" },
        { name: "Tablet", value: 15, fill: "hsl(var(--chart-3))" },
        { name: "Other", value: 5, fill: "hsl(var(--chart-4))" },
      ],
    },
    tableData: [
      {
        id: "1",
        page: "/home",
        views: Math.floor(12543 * baseMultiplier),
        users: Math.floor(8934 * baseMultiplier),
        bounceRate: 25,
        avgTime: "3:24",
      },
      {
        id: "2",
        page: "/products",
        views: Math.floor(8765 * baseMultiplier),
        users: Math.floor(6123 * baseMultiplier),
        bounceRate: 42,
        avgTime: "2:18",
      },
      {
        id: "3",
        page: "/about",
        views: Math.floor(5432 * baseMultiplier),
        users: Math.floor(3876 * baseMultiplier),
        bounceRate: 67,
        avgTime: "1:45",
      },
      {
        id: "4",
        page: "/contact",
        views: Math.floor(3421 * baseMultiplier),
        users: Math.floor(2543 * baseMultiplier),
        bounceRate: 35,
        avgTime: "2:56",
      },
      {
        id: "5",
        page: "/blog",
        views: Math.floor(2876 * baseMultiplier),
        users: Math.floor(2123 * baseMultiplier),
        bounceRate: 28,
        avgTime: "4:12",
      },
    ],
  };
};

// Placeholder component for unimplemented content
const PlaceholderContent = ({ contentType }: { contentType: ContentType }) => {
  const getContentInfo = (type: ContentType) => {
    const contentMap = {
      "analytics-traffic": {
        title: "Traffic Sources",
        description: "Track where your visitors come from",
      },
      "analytics-users": {
        title: "User Journey",
        description: "Analyze user behavior patterns",
      },
      "analytics-conversions": {
        title: "Conversion Funnels",
        description: "Sales funnel analysis",
      },
      "analytics-reports": {
        title: "Custom Reports",
        description: "Generate detailed reports",
      },
      "analytics-testing": {
        title: "A/B Testing",
        description: "Split testing tools",
      },
      "ecommerce-products": {
        title: "Products",
        description: "Manage your product catalog",
      },
      "ecommerce-inventory": {
        title: "Inventory",
        description: "Stock management",
      },
      "ecommerce-revenue": {
        title: "Revenue Analytics",
        description: "Sales performance insights",
      },
      "ecommerce-customers": {
        title: "Customer Insights",
        description: "Customer analytics",
      },
      "ecommerce-promotions": {
        title: "Promotions",
        description: "Discount management",
      },
      "ecommerce-marketing": {
        title: "Marketing",
        description: "Marketing campaigns",
      },
      "blog-posts": {
        title: "Blog Posts",
        description: "Manage your blog content",
      },
      "blog-categories": {
        title: "Categories",
        description: "Content organization",
      },
      "blog-media": { title: "Media Library", description: "File management" },
      "blog-comments": { title: "Comments", description: "Comment moderation" },
      "blog-social": {
        title: "Social Media",
        description: "Social engagement",
      },
      "blog-newsletter": {
        title: "Newsletter",
        description: "Email subscribers",
      },
      "blog-seo": { title: "SEO Tools", description: "Search optimization" },
      "saas-users": { title: "User Management", description: "User accounts" },
      "saas-subscriptions": {
        title: "Subscriptions",
        description: "Billing management",
      },
      "saas-api": { title: "API Usage", description: "API monitoring" },
      "saas-performance": {
        title: "Performance",
        description: "System performance",
      },
      "saas-infrastructure": {
        title: "Infrastructure",
        description: "Cloud infrastructure",
      },
      "saas-security": {
        title: "Security",
        description: "Security monitoring",
      },
      "saas-integrations": {
        title: "Integrations",
        description: "Third-party integrations",
      },
      "tools-calendar": { title: "Calendar", description: "Scheduled events" },
      "tools-charts": {
        title: "Charts & Reports",
        description: "Data visualization",
      },
      "tools-devices": {
        title: "Device Analytics",
        description: "Cross-device tracking",
      },
      settings: { title: "Settings", description: "System configuration" },
      help: { title: "Help Center", description: "Documentation & guides" },
      notifications: {
        title: "Notifications",
        description: "System notifications",
      },
      feedback: {
        title: "Feature Requests",
        description: "Request new features",
      },
    };

    return (
      contentMap[type] || {
        title: "Coming Soon",
        description: "This feature is under development",
      }
    );
  };

  const info = getContentInfo(contentType);

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="h-24 w-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <div className="text-2xl">🚧</div>
        </div>
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {info.title}
        </h2>
        <p className="text-muted-foreground mb-4">{info.description}</p>
        <div className="text-sm text-muted-foreground">
          This page is coming soon! Stay tuned for updates.
        </div>
      </div>
    </div>
  );
};

export function DashboardLayout() {
  const [selectedWebsite, setSelectedWebsite] = useState<Website>(
    mockWebsites[0],
  );
  const [activeContent, setActiveContent] = useState<ContentType>("dashboard");
  // const dashboardData = generateMockData(selectedWebsite.type);
  const { data: dashboardData, loading, error } = useDashboardData(selectedWebsite.type);

  const renderContent = () => {
     if (loading) return <div className="p-6">Loading stats...</div>;
      if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
      if (!dashboardData) return <div className="p-6">No data available.</div>;

    switch (activeContent) {
      case "dashboard":
        return (
          <DashboardContent
            selectedWebsite={selectedWebsite}
            data={dashboardData}
          />
        );
      case "analytics-users-db1":
        return <UsersTable />;
      case "analytics-subscribed-db1":
        return <SubscribedUser />;
      case "analytics-blogCat":
        return <CategoryTable />;
      case "analytics-magazines":
        return <MagazineTable />;
      case "analytics-blogs":
        return <BlogList />;
      case "dashboard-db2":
        return <StatsDashboard />;
      case "dashboard-db4":
        return <StatsDash />;
      case "db4-users":
        return <UserTable/>
      case "db4-emission":
        return <FinanceEmissionTable/>
      case "db4-trackReg":
        return <RegistrationChartWrapper/>
      case "db4-trackEmission":
        return <EmissionChartWrapper/>
      case "db2-CountryChart":
        return <CountryPieChartWrapper/>
      default:
        return <PlaceholderContent contentType={activeContent} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <EnhancedSidebar
          selectedWebsite={selectedWebsite}
          activeContent={activeContent}
          onContentChange={setActiveContent}
        />
        <SidebarInset className="flex flex-col">
          <Navbar
            websites={mockWebsites}
            selectedWebsite={selectedWebsite}
            onWebsiteChange={setSelectedWebsite}
          />
          {renderContent()}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
