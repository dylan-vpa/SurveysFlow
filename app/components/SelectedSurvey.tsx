import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "~/client/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useNavigate } from "@remix-run/react";

interface Survey {
  id: string;
  name: string;
  status: "active" | "draft" | "closed";
}

interface SelectedSurveyProps {
  surveys: Survey[];
  currentSurveyId?: string;
}

export function SelectedSurvey({ surveys, currentSurveyId }: SelectedSurveyProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  const currentSurvey = surveys.find(
    (survey) => survey.id === currentSurveyId
  );

  const handleSurveySelect = (surveyId: string) => {
    setOpen(false);
    navigate(`/surveys/${surveyId}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {currentSurvey ? currentSurvey.name : "Select survey..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search surveys..." />
          <CommandEmpty>No survey found.</CommandEmpty>
          <CommandGroup>
            {surveys.map((survey) => (
              <CommandItem
                key={survey.id}
                value={survey.id}
                onSelect={() => handleSurveySelect(survey.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentSurveyId === survey.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex flex-1 items-center justify-between">
                  <span>{survey.name}</span>
                  <span
                    className={cn(
                      "ml-2 rounded-full px-2 py-1 text-xs",
                      {
                        "bg-green-100 text-green-700": survey.status === "active",
                        "bg-yellow-100 text-yellow-700": survey.status === "draft",
                        "bg-gray-100 text-gray-700": survey.status === "closed",
                      }
                    )}
                  >
                    {survey.status}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}