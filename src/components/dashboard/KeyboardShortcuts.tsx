import { useEffect, useState } from "react";
import { Keyboard, Command } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const shortcuts = [
  {
    keys: ["Ctrl", "B"],
    description: "Toggle sidebar",
    category: "Navigation",
  },

];

const KeyBadge = ({ children }: { children: React.ReactNode }) => (
  <Badge
    variant="outline"
    className="px-2 py-1 text-xs font-mono bg-muted/50 border-2 border-dashed"
  >
    {children}
  </Badge>
);

export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "?" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const groupedShortcuts = shortcuts.reduce(
    (acc, shortcut) => {
      if (!acc[shortcut.category]) {
        acc[shortcut.category] = [];
      }
      acc[shortcut.category].push(shortcut);
      return acc;
    },
    {} as Record<string, typeof shortcuts>,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg border border-dashed border-purple-200 dark:border-purple-800 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/20"
        >
          <Keyboard className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Command className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Speed up your workflow with these keyboard shortcuts
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          {Object.entries(groupedShortcuts).map(([category, shortcuts]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
                {category}
              </h3>
              <div className="space-y-2">
                {shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-sm">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <span
                          key={keyIndex}
                          className="flex items-center gap-1"
                        >
                          <KeyBadge>{key}</KeyBadge>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="text-xs text-muted-foreground">
                              +
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
