import { Search, User, Settings, Menu, Sidebar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { WebsiteSelector } from "./WebsiteSelector";
import { NotificationsPanel } from "./NotificationsPanel";
import { KeyboardShortcuts } from "./KeyboardShortcuts";
import { Website } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface NavbarProps {
  websites: Website[];
  selectedWebsite: Website;
  onWebsiteChange: (website: Website) => void;
}

export function Navbar({
  websites,
  selectedWebsite,
  onWebsiteChange,
}: NavbarProps) {
  const { state } = useSidebar();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 transition-all duration-300">
      {/* Enhanced Sidebar Toggle - Always Visible */}
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger
            className={cn(
              "h-9 w-9 rounded-lg transition-all duration-300 hover:bg-muted/80",
              "border border-dashed border-blue-200 dark:border-blue-800",
              "hover:border-blue-400 hover:shadow-sm",
              "flex items-center justify-center group",
            )}
          >
            <div className="relative">
              {state === "expanded" ? (
                <Sidebar className="h-4 w-4 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110" />
              ) : (
                <Menu className="h-4 w-4 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110" />
              )}
            </div>
          </SidebarTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          {state === "expanded" ? "Collapse sidebar" : "Expand sidebar"}
        </TooltipContent>
      </Tooltip>

      <div className="flex items-center gap-4 flex-1">
        <WebsiteSelector
          websites={websites}
          selectedWebsite={selectedWebsite}
          onWebsiteChange={onWebsiteChange}
        />

        <div
          className={cn(
            "items-center gap-2 max-w-sm flex-1 transition-all duration-300",
            "hidden md:flex",
            state === "collapsed" && "ml-4",
          )}
        >
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Mobile Search Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 rounded-lg border border-dashed border-gray-200 dark:border-gray-800 hover:border-gray-400"
            >
              <Search className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            Search
          </TooltipContent>
        </Tooltip>

        <NotificationsPanel />

        <KeyboardShortcuts />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full hover:ring-2 hover:ring-blue-200 dark:hover:ring-blue-800 transition-all duration-300"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@user" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white text-xs font-semibold">
                  AD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@dashboard.app
                </p>
              </div>
            </DropdownMenuLabel>
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem> */}
            {/* <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400">
              <span>Log out</span>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
