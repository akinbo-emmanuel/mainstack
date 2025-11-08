import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cn } from "@/lib/utils";
import { TRANSACTION_TYPE_OPTIONS } from "../../../constants/filters";
import type { TransactionTypeFilters } from "../../../types/filters";

interface TransactionTypeFilterProps {
  transactionTypes: TransactionTypeFilters;
  onTransactionTypeChange: (type: keyof TransactionTypeFilters) => void;
}

export default function TransactionTypeFilter({
  transactionTypes,
  onTransactionTypeChange,
}: TransactionTypeFilterProps) {
  const getDisplayText = () => {
    const selected = TRANSACTION_TYPE_OPTIONS.filter(
      (option) => transactionTypes[option.key as keyof TransactionTypeFilters]
    ).map((option) => option.label);
    
    return selected.length > 0 ? selected.join(", ") : "Select type";
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="leading-6 font-semibold text-[#131316]">
        Transaction Type
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full h-auto py-3.5 px-4 justify-between text-left font-normal bg-[#EFF1F6] hover:bg-[#E5E7EB] rounded-[12px] border border-[#EFF1F6] cursor-pointer transition-all duration-300 ease-in-out"
            )}
          >
            <span className="text-sm/4 font-medium text-[#131316] truncate">
              {getDisplayText()}
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
          className="w-(--radix-popover-trigger-width) p-6 border-0 shadow-[0px_6px_12px_0px_#5C738314,0px_4px_8px_0px_#5C738314] bg-white rounded-[12px]"
          align="start"
          side="bottom"
          sideOffset={8}
        >
          <div className="space-y-7">
            {TRANSACTION_TYPE_OPTIONS.map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={transactionTypes[key]}
                  onChange={() => onTransactionTypeChange(key)}
                  className="w-5 h-5 rounded border-[#EFF1F6] text-[#131316] accent-[#131316] outline-none cursor-pointer"
                />
                <span className="text-[#131316] font-semibold leading-6">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
