import { useRef } from "react";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { PERIODS } from "../../../constants/filters";

interface PeriodFilterProps {
  tempSelectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

export default function PeriodFilter({
  tempSelectedPeriod,
  onPeriodChange,
}: PeriodFilterProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const orderedPeriods = [
    ...PERIODS.filter((p) => p.value === tempSelectedPeriod),
    ...PERIODS.filter((p) => p.value !== tempSelectedPeriod),
  ];

  return (
    <ScrollArea
      ref={scrollContainerRef}
      className="w-[calc(456px-40px)] whitespace-nowrap"
    >
      <div className="mb-2.5 flex items-center gap-3">
        {orderedPeriods.map((p) => (
          <button
            key={p.value}
            onClick={() => {
              onPeriodChange(p.value);
              // Scroll to start after reordering
              setTimeout(() => {
                const scrollElement =
                  scrollContainerRef.current?.querySelector(
                    "[data-radix-scroll-area-viewport]"
                  );
                if (scrollElement) {
                  scrollElement.scrollTo({
                    left: 0,
                    behavior: "smooth",
                  });
                }
              }, 50);
            }}
            className={`rounded-full border py-2.5 px-4 cursor-pointer transition-all ${
              tempSelectedPeriod === p.value
                ? "bg-[#131316] border-[#131316]"
                : "border-[#EFF1F6] hover:bg-[#EFF1F6]"
            }`}
          >
            <p
              className={`text-sm/4 font-semibold ${
                tempSelectedPeriod === p.value ? "text-white" : "text-[#131316]"
              }`}
            >
              {p.label}
            </p>
          </button>
        ))}
      </div>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
