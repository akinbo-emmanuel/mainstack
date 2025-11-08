import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import PeriodFilter from "./revenueDashboard/filters/PeriodFilter";
import DateRangeFilter from "./revenueDashboard/filters/DateRangeFilter";
import TransactionTypeFilter from "./revenueDashboard/filters/TransactionTypeFilter";
import StatusFilter from "./revenueDashboard/filters/StatusFilter";
import { hasFilterChanges } from "../utils/filterUtils";
import { DEFAULT_TRANSACTION_TYPES, DEFAULT_STATUSES, DEFAULT_PERIOD } from "../constants/filters";
import type { TransactionTypeFilters, StatusFilters, DateRange } from "../types/filters";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
  transactionTypes: TransactionTypeFilters;
  onTransactionTypesChange: (transactionTypes: TransactionTypeFilters) => void;
  statuses: StatusFilters;
  onStatusesChange: (statuses: StatusFilters) => void;
}

export default function FilterModal({
  isOpen,
  onClose,
  selectedPeriod: externalSelectedPeriod,
  onPeriodChange,
  dateRange: externalDateRange,
  onDateRangeChange,
  transactionTypes: externalTransactionTypes,
  onTransactionTypesChange,
  statuses: externalStatuses,
  onStatusesChange,
}: FilterModalProps) {

  // Filter state - Local state for temporary selection (before Apply is clicked)
  const [tempSelectedPeriod, setTempSelectedPeriod] = useState<string>(
    externalSelectedPeriod
  );
  const [tempDateRange, setTempDateRange] = useState(externalDateRange);
  const [transactionTypes, setTransactionTypes] = useState(externalTransactionTypes);
  const [statuses, setStatuses] = useState(externalStatuses);
  
  // Track initial state when modal opens
  const [initialTransactionTypes, setInitialTransactionTypes] = useState(externalTransactionTypes);
  const [initialStatuses, setInitialStatuses] = useState(externalStatuses);

  // Sync temp state with external state when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempSelectedPeriod(externalSelectedPeriod);
      setTempDateRange(externalDateRange);
      // Sync with external state (applied filters)
      setTransactionTypes(externalTransactionTypes);
      setStatuses(externalStatuses);
      // Capture current external state as initial for comparison
      setInitialTransactionTypes(externalTransactionTypes);
      setInitialStatuses(externalStatuses);
    }
  }, [isOpen, externalSelectedPeriod, externalDateRange, externalTransactionTypes, externalStatuses]);

  const filtersChanged = hasFilterChanges(
    {
      period: tempSelectedPeriod,
      dateRange: tempDateRange,
      transactionTypes,
      statuses,
    },
    {
      period: externalSelectedPeriod,
      dateRange: externalDateRange,
      transactionTypes: initialTransactionTypes,
      statuses: initialStatuses,
    }
  );

  // Handler functions
  const handleTransactionTypeChange = (type: keyof typeof transactionTypes) => {
    setTransactionTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleStatusChange = (status: keyof typeof statuses) => {
    setStatuses((prev) => ({ ...prev, [status]: !prev[status] }));
  };

  const handleClear = () => {
    setTempSelectedPeriod(DEFAULT_PERIOD);
    setTempDateRange({ from: "", to: "" });
    setTransactionTypes(DEFAULT_TRANSACTION_TYPES);
    setStatuses(DEFAULT_STATUSES);
  };

  const handleApply = () => {
    onPeriodChange(tempSelectedPeriod);
    onDateRangeChange(tempDateRange);
    onTransactionTypesChange(transactionTypes);
    onStatusesChange(statuses);
    onClose();
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-end pr-3 font-degular">
        <div
          className={`h-full max-h-[97.5vh] w-full max-w-[456px] bg-white shadow-2xl rounded-2xl transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between py-5 px-6 rounded-t-2xl">
            <h2 className="text-2xl/[120%] font-bold text-[#131316]">Filter</h2>
            <button onClick={onClose} className="transition-colors">
              <MdClose size={24} className="text-[#56616B]" />
            </button>
          </div>

          {/* Content */}
          <div className="py-2 px-5 space-y-6 overflow-y-auto h-[calc(100%-140px)]">
            <PeriodFilter
              tempSelectedPeriod={tempSelectedPeriod}
              onPeriodChange={setTempSelectedPeriod}
            />

            <DateRangeFilter
              tempDateRange={tempDateRange}
              onDateRangeChange={setTempDateRange}
              onPeriodChange={setTempSelectedPeriod}
            />

            <TransactionTypeFilter
              transactionTypes={transactionTypes}
              onTransactionTypeChange={handleTransactionTypeChange}
            />

            <StatusFilter
              statuses={statuses}
              onStatusChange={handleStatusChange}
            />
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 py-5 px-6 bg-white flex gap-3 rounded-b-2xl">
            <button
              onClick={handleClear}
              className="flex-1 px-6 py-3 border border-[#EFF1F6] rounded-full font-semibold text-[#131316] hover:bg-[#EFF1F6] transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleApply}
              disabled={!filtersChanged}
              className="flex-1 px-6 py-3 bg-[#131316] text-white rounded-full font-semibold hover:bg-[#131316]/90 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
