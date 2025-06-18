import {
  BarChart3,
  Users,
  ShoppingCart,
  TrendingUp,
  Settings,
  FileText,
  PieChart,
  Activity,
  Mail,
  Calendar,
  Database,
  Shield,
  DollarSign,
  Globe,
  MessageSquare,
  BookOpen,
  Target,
  Zap,
  Package,
  Home,
  Bell,
  HelpCircle,
  LogOut,
  Sparkles,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Website } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  selectedWebsite: Website;
}

const getSidebarItems = (websiteType: Website["type"]) => {
  const commonItems = [
    {
      title: "Dashboard",
      url: "#",
      icon: Home,
      badge: null,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/50",
      isActive: true,
    },
    {
      title: "Analytics",
      url: "#",
      icon: TrendingUp,
      badge: "Pro",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/50",
    },
  ];

  const specificItems = {
    analytics: [
      {
        title: "Traffic Sources",
        url: "#",
        icon: Globe,
        badge: "Live",
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-950/50",
      },
      {
        title: "User Behavior",
        url: "#",
        icon: Users,
        badge: null,
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-50 dark:bg-orange-950/50",
      },
      {
        title: "Conversion Funnels",
        url: "#",
        icon: Target,
        badge: "AI",
        color: "text-pink-600 dark:text-pink-400",
        bgColor: "bg-pink-50 dark:bg-pink-950/50",
      },
      {
        title: "Reports",
        url: "#",
        icon: FileText,
        badge: null,
        color: "text-indigo-600 dark:text-indigo-400",
        bgColor: "bg-indigo-50 dark:bg-indigo-950/50",
      },
    ],
    ecommerce: [
      {
        title: "Orders",
        url: "#",
        icon: ShoppingCart,
        badge: "24",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-950/50",
      },
      {
        title: "Products",
        url: "#",
        icon: Package,
        badge: null,
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-950/50",
      },
      {
        title: "Revenue",
        url: "#",
        icon: DollarSign,
        badge: "↗",
        color: "text-emerald-600 dark:text-emerald-400",
        bgColor: "bg-emerald-50 dark:bg-emerald-950/50",
      },
      {
        title: "Customers",
        url: "#",
        icon: Users,
        badge: null,
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-950/50",
      },
      {
        title: "Inventory",
        url: "#",
        icon: Database,
        badge: "Low",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50 dark:bg-red-950/50",
      },
    ],
    blog: [
      {
        title: "Posts",
        url: "#",
        icon: BookOpen,
        badge: "Draft",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-950/50",
      },
      {
        title: "Comments",
        url: "#",
        icon: MessageSquare,
        badge: "5",
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-50 dark:bg-orange-950/50",
      },
      {
        title: "Engagement",
        url: "#",
        icon: Activity,
        badge: "↗",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-950/50",
      },
      {
        title: "Newsletter",
        url: "#",
        icon: Mail,
        badge: "New",
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-950/50",
      },
    ],
    saas: [
      {
        title: "Users",
        url: "#",
        icon: Users,
        badge: "1.2k",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-950/50",
      },
      {
        title: "Subscriptions",
        url: "#",
        icon: DollarSign,
        badge: "Pro",
        color: "text-emerald-600 dark:text-emerald-400",
        bgColor: "bg-emerald-50 dark:bg-emerald-950/50",
      },
      {
        title: "Usage",
        url: "#",
        icon: Activity,
        badge: "95%",
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-50 dark:bg-orange-950/50",
      },
      {
        title: "Performance",
        url: "#",
        icon: Zap,
        badge: "Fast",
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-50 dark:bg-yellow-950/50",
      },
      {
        title: "Security",
        url: "#",
        icon: Shield,
        badge: null,
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50 dark:bg-red-950/50",
      },
    ],
  };

  return {
    main: [...commonItems, ...specificItems[websiteType]],
    tools: [
      {
        title: "Calendar",
        url: "#",
        icon: Calendar,
        badge: "3",
        color: "text-indigo-600 dark:text-indigo-400",
        bgColor: "bg-indigo-50 dark:bg-indigo-950/50",
      },
      {
        title: "Charts",
        url: "#",
        icon: PieChart,
        badge: null,
        color: "text-pink-600 dark:text-pink-400",
        bgColor: "bg-pink-50 dark:bg-pink-950/50",
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings,
        badge: null,
        color: "text-gray-600 dark:text-gray-400",
        bgColor: "bg-gray-50 dark:bg-gray-950/50",
      },
    ],
    support: [
      {
        title: "Help Center",
        url: "#",
        icon: HelpCircle,
        badge: null,
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-950/50",
      },
      {
        title: "Notifications",
        url: "#",
        icon: Bell,
        badge: "2",
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-50 dark:bg-orange-950/50",
      },
    ],
  };
};

const getWebsiteTypeIcon = (type: Website["type"]) => {
  switch (type) {
    case "analytics":
      return BarChart3;
    case "ecommerce":
      return ShoppingCart;
    case "blog":
      return BookOpen;
    case "saas":
      return Zap;
    default:
      return Globe;
  }
};

const getWebsiteTypeGradient = (type: Website["type"]) => {
  switch (type) {
    case "analytics":
      return "bg-gradient-to-r from-blue-500 to-purple-600";
    case "ecommerce":
      return "bg-gradient-to-r from-green-500 to-emerald-600";
    case "blog":
      return "bg-gradient-to-r from-orange-500 to-red-600";
    case "saas":
      return "bg-gradient-to-r from-purple-500 to-pink-600";
    default:
      return "bg-gradient-to-r from-gray-500 to-gray-600";
  }
};

export function DashboardSidebar({ selectedWebsite }: DashboardSidebarProps) {
  const sidebarItems = getSidebarItems(selectedWebsite.type);
  const WebsiteIcon = getWebsiteTypeIcon(selectedWebsite.type);
  const gradientClass = getWebsiteTypeGradient(selectedWebsite.type);

  return (
    <Sidebar className="border-r border-sidebar-border/50">
      <SidebarHeader className="border-b border-sidebar-border/50 bg-gradient-to-r from-background to-muted/20">
        <div className="flex items-center gap-3 px-3 py-4">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg",
              gradientClass,
            )}
          >
            <WebsiteIcon className="h-5 w-5" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-semibold truncate">
              {selectedWebsite.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground capitalize">
                {selectedWebsite.type}
              </span>
              <Badge
                variant="secondary"
                className="px-1.5 py-0 text-xs h-4 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 dark:from-emerald-950 dark:to-blue-950 dark:text-emerald-300"
              >
                <Sparkles className="h-2.5 w-2.5 mr-1" />
                Premium
              </Badge>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider mb-2">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {sidebarItems.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "group relative h-10 rounded-lg transition-all duration-200 hover:shadow-md",
                      item.isActive &&
                        "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200/50 dark:border-blue-800/50",
                    )}
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                          item.isActive
                            ? item.bgColor
                            : "group-hover:" + item.bgColor,
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-4 w-4 transition-colors",
                            item.isActive
                              ? item.color
                              : "text-muted-foreground group-hover:" +
                                  item.color,
                          )}
                        />
                      </div>
                      <span
                        className={cn(
                          "font-medium transition-colors",
                          item.isActive
                            ? "text-foreground"
                            : "text-muted-foreground group-hover:text-foreground",
                        )}
                      >
                        {item.title}
                      </span>
                      {item.badge && (
                        <Badge
                          variant={item.isActive ? "default" : "secondary"}
                          className={cn(
                            "ml-auto h-5 px-1.5 text-xs font-medium",
                            item.badge === "Live" &&
                              "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 animate-pulse",
                            item.badge === "AI" &&
                              "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 dark:from-purple-950 dark:to-pink-950 dark:text-purple-300",
                            item.badge === "Pro" &&
                              "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 dark:from-amber-950 dark:to-orange-950 dark:text-amber-300",
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider mb-2">
            Tools & Features
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {sidebarItems.tools.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group h-9 rounded-lg transition-all duration-200 hover:shadow-sm"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-md transition-colors group-hover:" +
                            item.bgColor,
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-3.5 w-3.5 transition-colors text-muted-foreground group-hover:" +
                              item.color,
                          )}
                        />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {item.title}
                      </span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-auto h-4 px-1 text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider mb-2">
            Support
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {sidebarItems.support.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group h-9 rounded-lg transition-all duration-200 hover:shadow-sm"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-md transition-colors group-hover:" +
                            item.bgColor,
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-3.5 w-3.5 transition-colors text-muted-foreground group-hover:" +
                              item.color,
                          )}
                        />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {item.title}
                      </span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-auto h-4 px-1 text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/50 bg-gradient-to-r from-background to-muted/10">
        <div className="flex items-center gap-3 px-3 py-3">
          <Avatar className="h-8 w-8 ring-2 ring-background shadow-sm">
            <AvatarImage src="/avatars/admin.png" alt="Admin" />
            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-xs font-semibold">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-xs font-semibold truncate">Admin User</span>
            <span className="text-xs text-muted-foreground truncate">
              admin@company.com
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md"
          >
            <LogOut className="h-3.5 w-3.5" />
          </Button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
