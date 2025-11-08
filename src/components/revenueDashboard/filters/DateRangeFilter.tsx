import { format } from "date-fns";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cn } from "@/lib/utils";
import type { DateRange } from "../../../types/filters";

interface DateRangeFilterProps {
  tempDateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
  onPeriodChange: (period: string) => void;
}

export default function DateRangeFilter({
  tempDateRange,
  onDateRangeChange,
  onPeriodChange,
}: DateRangeFilterProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="leading-6 font-semibold text-[#131316]">
        Custom Date Range
      </label>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!tempDateRange.from}
                className={cn(
                  "w-full h-auto py-3.5 px-4 justify-between text-left font-normal bg-[#EFF1F6] hover:bg-[#E5E7EB] rounded-[12px] border border-[#EFF1F6] cursor-pointer transition-all duration-300 ease-in-out",
                  !tempDateRange.from && "text-[#56616B]"
                )}
              >
                <span className="text-sm/4 font-medium text-[#131316]">
                  {tempDateRange.from ? (
                    format(new Date(tempDateRange.from), "dd MMM yyyy")
                  ) : (
                    <span className="text-[#56616B]">Select date</span>
                  )}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  color="#31373D"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 border-0 shadow-[0px_6px_12px_0px_#5C738314,0px_4px_8px_0px_#5C738314]"
              align="start"
              side="bottom"
              sideOffset={8}
            >
              <Calendar
                mode="single"
                selected={
                  tempDateRange.from
                    ? new Date(tempDateRange.from)
                    : undefined
                }
                onSelect={(date) => {
                  const dateString = date ? format(date, "yyyy-MM-dd") : "";
                  onDateRangeChange({
                    ...tempDateRange,
                    from: dateString,
                  });
                  // When custom date is selected, set period to custom
                  if (dateString) {
                    onPeriodChange("custom");
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!tempDateRange.to}
                className={cn(
                  "w-full h-auto py-3.5 px-4 justify-between text-left font-normal bg-[#EFF1F6] hover:bg-[#E5E7EB] rounded-[12px] border border-[#EFF1F6] cursor-pointer transition-all duration-300 ease-in-out",
                  !tempDateRange.to && "text-[#56616B]"
                )}
              >
                <span className="text-sm/4 font-medium text-[#131316]">
                  {tempDateRange.to ? (
                    format(new Date(tempDateRange.to), "dd MMM yyyy")
                  ) : (
                    <span className="text-[#56616B]">Select date</span>
                  )}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  color="#31373D"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 border-0 shadow-[0px_6px_12px_0px_#5C738314,0px_4px_8px_0px_#5C738314]"
              align="end"
              side="bottom"
              sideOffset={8}
            >
              <Calendar
                mode="single"
                selected={
                  tempDateRange.to ? new Date(tempDateRange.to) : undefined
                }
                onSelect={(date) => {
                  const dateString = date ? format(date, "yyyy-MM-dd") : "";
                  onDateRangeChange({
                    ...tempDateRange,
                    to: dateString,
                  });
                  // When custom date is selected, set period to custom
                  if (dateString) {
                    onPeriodChange("custom");
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
