import {
  Bell,
  Check,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign,
  Shield,
  X,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  read: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Revenue Milestone",
    message: "You've reached $50k in monthly revenue! 🎉",
    type: "success",
    timestamp: "2 minutes ago",
    read: false,
    icon: DollarSign,
  },
  {
    id: "2",
    title: "Traffic Spike Detected",
    message: "Your website traffic is up 150% compared to yesterday.",
    type: "info",
    timestamp: "15 minutes ago",
    read: false,
    icon: TrendingUp,
  },
  {
    id: "3",
    title: "New User Milestone",
    message: "Congratulations! You now have 10,000 active users.",
    type: "success",
    timestamp: "1 hour ago",
    read: true,
    icon: Users,
  },
  {
    id: "4",
    title: "Security Alert",
    message: "Unusual login activity detected from new location.",
    type: "warning",
    timestamp: "2 hours ago",
    read: false,
    icon: Shield,
  },
  {
    id: "5",
    title: "Server Maintenance",
    message: "Scheduled maintenance will begin in 2 hours.",
    type: "info",
    timestamp: "3 hours ago",
    read: true,
    icon: AlertCircle,
  },
  {
    id: "6",
    title: "Payment Processing",
    message: "Monthly billing cycle completed successfully.",
    type: "success",
    timestamp: "1 day ago",
    read: true,
    icon: Check,
  },
];

const getNotificationIcon = (
  type: string,
  CustomIcon?: React.ComponentType<{ className?: string }>,
) => {
  if (CustomIcon) return CustomIcon;

  switch (type) {
    case "success":
      return Check;
    case "warning":
      return AlertCircle;
    case "error":
      return X;
    default:
      return Bell;
  }
};

const getNotificationColors = (type: string) => {
  switch (type) {
    case "success":
      return {
        bg: "bg-green-50 dark:bg-green-950/20",
        border: "border-green-200 dark:border-green-800",
        icon: "text-green-600 dark:text-green-400",
        iconBg: "bg-green-100 dark:bg-green-950/50",
      };
    case "warning":
      return {
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        border: "border-yellow-200 dark:border-yellow-800",
        icon: "text-yellow-600 dark:text-yellow-400",
        iconBg: "bg-yellow-100 dark:bg-yellow-950/50",
      };
    case "error":
      return {
        bg: "bg-red-50 dark:bg-red-950/20",
        border: "border-red-200 dark:border-red-800",
        icon: "text-red-600 dark:text-red-400",
        iconBg: "bg-red-100 dark:bg-red-950/50",
      };
    default:
      return {
        bg: "bg-blue-50 dark:bg-blue-950/20",
        border: "border-blue-200 dark:border-blue-800",
        icon: "text-blue-600 dark:text-blue-400",
        iconBg: "bg-blue-100 dark:bg-blue-950/50",
      };
  }
};

export function NotificationsPanel() {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center animate-pulse"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-96 p-0"
        align="end"
        forceMount
        side="bottom"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-lg">Notifications</h3>
          </div>
          {unreadCount > 0 && (
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200"
            >
              {unreadCount} new
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 p-3 border-b bg-muted/30">
          <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
            <Check className="h-3 w-3 mr-1" />
            Mark all read
          </Button>
          <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
            <Bell className="h-3 w-3 mr-1" />
            Settings
          </Button>
        </div>

        {/* Notifications List */}
        <ScrollArea className="h-[400px]">
          <div className="p-2">
            {mockNotifications.map((notification, index) => {
              const colors = getNotificationColors(notification.type);
              const IconComponent = getNotificationIcon(
                notification.type,
                notification.icon,
              );

              return (
                <div key={notification.id}>
                  <div
                    className={cn(
                      "p-3 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer",
                      "border border-dashed",
                      colors.bg,
                      colors.border,
                      !notification.read &&
                        "ring-2 ring-blue-200/50 dark:ring-blue-800/50",
                    )}
                  >
                    <div className="flex gap-3">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0",
                          colors.iconBg,
                        )}
                      >
                        <IconComponent className={cn("h-4 w-4", colors.icon)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            className={cn(
                              "font-medium text-sm truncate",
                              !notification.read && "font-semibold",
                            )}
                          >
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {notification.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < mockNotifications.length - 1 && (
                    <div className="my-2" />
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-3 border-t bg-muted/30">
          <Button
            variant="ghost"
            className="w-full h-8 text-xs text-muted-foreground hover:text-foreground"
          >
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
