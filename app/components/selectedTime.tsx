import { Check, Calendar } from "lucide-react";
import { useState } from "react";
import { cn } from "~/client/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

interface TimeRange {
  id: string;
  label: string;
  days: number;
}

interface TimeFilterProps {
  onTimeRangeChange: (range: { startDate: Date; endDate: Date }) => void;
  currentRangeId?: string;
}

const timeRanges: TimeRange[] = [
  { id: "7d", label: "Last 7 days", days: 7 },
  { id: "30d", label: "Last 30 days", days: 30 },
  { id: "60d", label: "Last 60 days", days: 60 },
  { id: "90d", label: "Last 90 days", days: 90 },
  { id: "180d", label: "Last 180 days", days: 180 },
  { id: "365d", label: "Last 365 days", days: 365 },
];

// Función auxiliar para formatear fechas
const formatDate = (date: Date): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}`;
};

// Función auxiliar para restar días
const subtractDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

export function TimeFilter({ onTimeRangeChange, currentRangeId = "30d" }: TimeFilterProps) {
  const [open, setOpen] = useState(false);
  
  const currentRange = timeRanges.find(range => range.id === currentRangeId);

  const handleRangeSelect = (rangeId: string) => {
    const selectedRange = timeRanges.find(range => range.id === rangeId);
    if (selectedRange) {
      const endDate = new Date();
      const startDate = subtractDays(endDate, selectedRange.days);
      
      onTimeRangeChange({ startDate, endDate });
    }
    setOpen(false);
  };

  // Calcular las fechas actuales para mostrar en el botón
  const endDate = new Date();
  const startDate = currentRange 
    ? subtractDays(endDate, currentRange.days)
    : subtractDays(endDate, 30);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            {currentRange ? currentRange.label : "Select time range"}
          </div>
          <span className="ml-auto text-xs text-muted-foreground">
            {`${formatDate(startDate)} - ${formatDate(endDate)}`}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandEmpty>No range found.</CommandEmpty>
          <CommandGroup heading="Select time range">
            {timeRanges.map((range) => (
              <CommandItem
                key={range.id}
                value={range.id}
                onSelect={() => handleRangeSelect(range.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentRangeId === range.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <span>{range.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}