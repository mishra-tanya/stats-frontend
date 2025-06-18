export const SIDEBAR_THEMES = {
  default: {
    background: "bg-background",
    border: "border-sidebar-border/30",
    header: "bg-gradient-to-br from-background via-muted/30 to-background",
    footer: "bg-gradient-to-br from-background via-muted/20 to-background",
  },
  glass: {
    background: "bg-background/80 backdrop-blur-xl",
    border: "border-white/20 dark:border-white/10",
    header:
      "bg-gradient-to-br from-white/50 via-white/30 to-white/50 dark:from-black/50 dark:via-black/30 dark:to-black/50",
    footer:
      "bg-gradient-to-br from-white/40 via-white/20 to-white/40 dark:from-black/40 dark:via-black/20 dark:to-black/40",
  },
  colorful: {
    background:
      "bg-gradient-to-b from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20",
    border: "border-blue-200/30 dark:border-blue-800/30",
    header:
      "bg-gradient-to-br from-blue-100/50 via-purple-100/30 to-blue-100/50 dark:from-blue-900/30 dark:via-purple-900/20 dark:to-blue-900/30",
    footer:
      "bg-gradient-to-br from-blue-50/40 via-purple-50/20 to-blue-50/40 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-blue-900/20",
  },
  minimal: {
    background: "bg-white dark:bg-gray-950",
    border: "border-gray-200 dark:border-gray-800",
    header: "bg-gray-50 dark:bg-gray-900",
    footer: "bg-gray-50 dark:bg-gray-900",
  },
} as const;

export type SidebarTheme = keyof typeof SIDEBAR_THEMES;

export const getBadgeVariants = (badge: string) => {
  const variants = {
    Live: "bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse shadow-red-200 dark:shadow-red-900",
    AI: "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-purple-200 dark:shadow-purple-900",
    Pro: "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-200 dark:shadow-amber-900",
    New: "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-green-200 dark:shadow-green-900",
    Beta: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-cyan-200 dark:shadow-cyan-900",
    Premium:
      "bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100 text-amber-800 dark:from-amber-950/50 dark:via-yellow-950/50 dark:to-amber-950/50 dark:text-amber-200 border border-amber-200/50 dark:border-amber-800/50",
    Vote: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    "↗": "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    Draft:
      "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
    Low: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
    Active: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    Healthy: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    Secure: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
    Fast: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
    Multi: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
  } as const;

  return (
    variants[badge as keyof typeof variants] || "bg-muted text-muted-foreground"
  );
};
