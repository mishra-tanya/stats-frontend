import {
  Bell,
  Check,
  Clock,
  AlertCircle,
  DollarSign,
  X,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import useFetch from "@/hooks/useFetch"; 

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
  timestamp?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface Milestone {
  milestone: number;
  connection: string;
  description: string;
}

const getNotificationIcon = (
  type: string,
  CustomIcon?: React.ComponentType<{ className?: string }>
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
  const { data: milestoneData, loading, error } = useFetch<Milestone[]>("/db1/notifications/milestones");

  const notifications: Notification[] =
    milestoneData?.map((item) => ({
      id: `${item.connection}-${item.milestone}`,
      title: `Milestone in ${item.connection}`,
      message: item.description,
      type: "success",
      // timestamp: "Just now",
      icon: DollarSign,
    })) || [];

  const unreadCount = notifications.length;

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
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-lg">Notifications</h3>
          </div>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="p-2">
            {loading ? (
              <div className="text-sm text-muted-foreground p-4">
                Loading notifications...
              </div>
            ) : error ? (
              <div className="text-sm text-destructive p-4">
                {error}
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((notification, index) => {
                const colors = getNotificationColors(notification.type);
                const IconComponent = getNotificationIcon(
                  notification.type,
                  notification.icon
                );

                return (
                  <div key={notification.id}>
                    <div
                      className={cn(
                        "p-3 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer",
                        "border border-dashed",
                        colors.bg,
                        colors.border
                      )}
                    >
                      <div className="flex gap-3">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0",
                            colors.iconBg
                          )}
                        >
                          <IconComponent className={cn("h-4 w-4", colors.icon)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">
                            {notification.title}
                          </h4>
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
                    {index < notifications.length - 1 && <div className="my-2" />}
                  </div>
                );
              })
            ) : (
              <div className="text-sm text-muted-foreground p-4">
                No notifications yet.
              </div>
            )}
          </div>
        </ScrollArea>

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
