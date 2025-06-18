import { Check, ChevronsUpDown, Globe } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Website } from "@/types/dashboard";

interface WebsiteSelectorProps {
  websites: Website[];
  selectedWebsite: Website;
  onWebsiteChange: (website: Website) => void;
}

export function WebsiteSelector({
  websites,
  selectedWebsite,
  onWebsiteChange,
}: WebsiteSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[400px] justify-between bg-background"
        >
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: selectedWebsite.color }}
            />
            <Globe className="h-4 w-4" />
            <span className="truncate">{selectedWebsite.name}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search websites..." />
          <CommandList>
            <CommandEmpty>No website found.</CommandEmpty>
            <CommandGroup>
              {websites.map((website) => (
                <CommandItem
                  key={website.id}
                  value={website.name}
                  onSelect={() => {
                    onWebsiteChange(website);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: website.color }}
                    />
                    <Globe className="h-4 w-4" />
                    <span className="truncate">{website.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground capitalize">
                      {website.type}
                    </span>
                  </div>
                  <Check
                    className={cn(
                      "ml-2 h-4 w-4",
                      selectedWebsite.id === website.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
