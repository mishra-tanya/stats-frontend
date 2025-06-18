import { LogOut, Sparkles, Crown } from "lucide-react";

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
import { ContentType } from "@/types/content";
import { cn } from "@/lib/utils";
import {
  WEBSITE_TYPE_CONFIGS,
  COMMON_TOOLS,
  SUPPORT_ITEMS,
  type SidebarItemConfig,
} from "./SidebarConfig";

interface EnhancedSidebarProps {
  selectedWebsite: Website;
  activeContent: ContentType;
  onContentChange: (contentId: ContentType) => void;
}

const SidebarMenuItem_Enhanced = ({
  item,
  isActive,
  onContentChange,
}: {
  item: SidebarItemConfig;
  isActive: boolean;
  onContentChange: (contentId: ContentType) => void;
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className={cn(
          "group relative h-10 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer",
          "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:opacity-0 before:transition-opacity hover:before:opacity-10",
          "before:from-blue-500 before:to-purple-500",
          isActive &&
            "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50",
          isActive &&
            "border border-blue-200/50 dark:border-blue-800/50 shadow-md",
          isActive && "before:opacity-5",
        )}
        onClick={() => onContentChange(item.contentId)}
      >
        <div className="flex items-center gap-3 relative z-10">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-300",
              "shadow-sm group-hover:shadow-md",
              isActive
                ? item.bgColor + " shadow-lg"
                : "group-hover:" + item.bgColor,
            )}
          >
            <item.icon
              className={cn(
                "h-4 w-4 transition-all duration-300",
                isActive
                  ? item.color + " drop-shadow-sm"
                  : "text-muted-foreground group-hover:" + item.color,
              )}
            />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span
              className={cn(
                "font-medium transition-colors truncate",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground group-hover:text-foreground",
              )}
            >
              {item.title}
            </span>
            {item.description && (
              <span className="text-xs text-muted-foreground/70 truncate">
                {item.description}
              </span>
            )}
          </div>
          {item.badge && (
            <Badge
              variant={isActive ? "default" : "secondary"}
              className={cn(
                "h-5 px-2 text-xs font-medium shadow-sm transition-all duration-300",
                item.badge === "Live" &&
                  "bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse shadow-red-200 dark:shadow-red-900",
                item.badge === "AI" &&
                  "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-purple-200 dark:shadow-purple-900",
                item.badge === "Pro" &&
                  "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-200 dark:shadow-amber-900",
                item.badge === "New" &&
                  "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-green-200 dark:shadow-green-900",
                item.badge === "Beta" &&
                  "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-cyan-200 dark:shadow-cyan-900",
                !["Live", "AI", "Pro", "New", "Beta"].includes(item.badge) &&
                  "bg-muted text-muted-foreground",
              )}
            >
              {item.badge}
            </Badge>
          )}
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export function EnhancedSidebar({
  selectedWebsite,
  activeContent,
  onContentChange,
}: EnhancedSidebarProps) {
  const config = WEBSITE_TYPE_CONFIGS[selectedWebsite.type];
  const WebsiteIcon = config.icon;

  return (
    <Sidebar className="border-r border-sidebar-border/30 backdrop-blur-sm">
      <SidebarHeader className="border-b border-sidebar-border/30 bg-gradient-to-br from-background via-muted/30 to-background flex-shrink-0">
        <div className="flex items-center gap-3 px-4 py-6">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-xl",
              "ring-2 ring-white/20 backdrop-blur-sm",
              config.gradient,
            )}
          >
            <WebsiteIcon className="h-6 w-6 drop-shadow-sm" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-lg font-bold truncate bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              {selectedWebsite.name}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground capitalize font-medium">
                {selectedWebsite.type} Platform
              </span>
              <Badge
                variant="secondary"
                className={cn(
                  "px-2 py-0.5 text-xs h-5 font-semibold shadow-sm",
                  "bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100",
                  "text-amber-800 dark:from-amber-950/50 dark:via-yellow-950/50 dark:to-amber-950/50",
                  "dark:text-amber-200 border border-amber-200/50 dark:border-amber-800/50",
                )}
              >
                <Crown className="h-2.5 w-2.5 mr-1" />
              </Badge>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto px-3 py-4 min-h-0">
        <div className="space-y-6">
          {config.sections.map((section, index) => (
            <div key={section.title}>
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-bold text-muted-foreground/90 uppercase tracking-wider mb-3 px-2">
                  {section.title}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {section.items.map((item) => (
                      <SidebarMenuItem_Enhanced
                        key={item.title}
                        item={item}
                        isActive={activeContent === item.contentId}
                        onContentChange={onContentChange}
                      />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </div>
          ))}

          <SidebarSeparator className="mx-2" />

          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-bold text-muted-foreground/90 uppercase tracking-wider mb-3 px-2">
              Tools & Analytics
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {COMMON_TOOLS.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="group h-9 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.01] cursor-pointer"
                      onClick={() => onContentChange(item.contentId)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-300",
                            "group-hover:" + item.bgColor,
                            "group-hover:shadow-sm",
                          )}
                        >
                          <item.icon
                            className={cn(
                              "h-3.5 w-3.5 transition-all duration-300",
                              "text-muted-foreground group-hover:" + item.color,
                            )}
                          />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors truncate">
                            {item.title}
                          </span>
                          {item.description && (
                            <span className="text-xs text-muted-foreground/60 truncate">
                              {item.description}
                            </span>
                          )}
                        </div>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="h-4 px-1.5 text-xs font-medium"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="mx-2" />

          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-bold text-muted-foreground/90 uppercase tracking-wider mb-3 px-2">
              Support & Help
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {SUPPORT_ITEMS.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="group h-9 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.01] cursor-pointer"
                      onClick={() => onContentChange(item.contentId)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-300",
                            "group-hover:" + item.bgColor,
                            "group-hover:shadow-sm",
                          )}
                        >
                          <item.icon
                            className={cn(
                              "h-3.5 w-3.5 transition-all duration-300",
                              "text-muted-foreground group-hover:" + item.color,
                            )}
                          />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors truncate">
                            {item.title}
                          </span>
                          {item.description && (
                            <span className="text-xs text-muted-foreground/60 truncate">
                              {item.description}
                            </span>
                          )}
                        </div>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className={cn(
                              "h-4 px-1.5 text-xs font-medium",
                              item.badge === "Vote" &&
                                "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
                            )}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Add some bottom padding to ensure content is not cut off */}
          <div className="h-4" />
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/30 bg-gradient-to-br from-background via-muted/20 to-background flex-shrink-0 mt-auto">
        <div className="flex items-center gap-3 px-4 py-4">
          <Avatar className="h-10 w-10 ring-2 ring-white/20 shadow-lg">
            <AvatarImage src="/avatars/admin.png" alt="Admin" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white text-sm font-bold">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-semibold truncate">Admin User</span>
            <span className="text-xs text-muted-foreground truncate">
              admin@dashboard.app
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-9 w-9 text-muted-foreground hover:text-foreground",
              "hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400",
              "rounded-lg transition-all duration-300 hover:shadow-md",
            )}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
