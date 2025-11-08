import { useState } from "react";
import { DEFAULT_PERIOD, DEFAULT_TRANSACTION_TYPES, DEFAULT_STATUSES } from "../constants/filters";
import type { TransactionTypeFilters, StatusFilters, DateRange } from "../types/filters";

export const useFilters = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(DEFAULT_PERIOD);
  const [dateRange, setDateRange] = useState<DateRange>({ from: "", to: "" });
  const [transactionTypes, setTransactionTypes] = useState<TransactionTypeFilters>(DEFAULT_TRANSACTION_TYPES);
  const [statuses, setStatuses] = useState<StatusFilters>(DEFAULT_STATUSES);

  return {
    selectedPeriod,
    setSelectedPeriod,
    dateRange,
    setDateRange,
    transactionTypes,
    setTransactionTypes,
    statuses,
    setStatuses,
  };
};
