import type { Transaction } from "../types/api";
import type { TransactionTypeFilters, StatusFilters, DateRange } from "../types/filters";

export const filterByPeriod = (
  transaction: Transaction,
  period: string,
  dateRange: DateRange
): boolean => {
  const txDate = new Date(transaction.date);
  const now = new Date();

  if (period === "custom") {
    if (dateRange.from && dateRange.to) {
      const fromDate = new Date(dateRange.from);
      const toDate = new Date(dateRange.to);
      toDate.setHours(23, 59, 59, 999);
      return txDate >= fromDate && txDate <= toDate;
    }
    return true;
  }

  switch (period) {
    case "today":
      return txDate.toDateString() === now.toDateString();
    case "last7days": {
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(now.getDate() - 7);
      return txDate >= sevenDaysAgo;
    }
    case "thisMonth":
      return (
        txDate.getMonth() === now.getMonth() &&
        txDate.getFullYear() === now.getFullYear()
      );
    case "last3months": {
      const threeMonthsAgo = new Date(now);
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      return txDate >= threeMonthsAgo;
    }
    case "thisYear":
      return txDate.getFullYear() === now.getFullYear();
    case "last1year": {
      const oneYearAgo = new Date(now);
      oneYearAgo.setFullYear(now.getFullYear() - 1);
      return txDate >= oneYearAgo;
    }
    case "allTime":
    default:
      return true;
  }
};

export const filterByStatus = (
  transaction: Transaction,
  statuses: StatusFilters
): boolean => {
  return statuses[transaction.status as keyof StatusFilters] || false;
};

export const filterByTransactionType = (
  transaction: Transaction,
  transactionTypes: TransactionTypeFilters
): boolean => {
  const anyTypeSelected = Object.values(transactionTypes).some((value) => value);
  if (!anyTypeSelected) return false;

  const txType = (transaction.type || "").toLowerCase();
  const txMetadataType = (transaction.metadata?.type || "").toLowerCase();

  const typeMatches = (keyword: string) =>
    txType.includes(keyword) || txMetadataType.includes(keyword);

  if (transactionTypes.storeTransactions && typeMatches("store")) return true;
  if (transactionTypes.getTipped && typeMatches("tip")) return true;
  if (transactionTypes.deposit && typeMatches("deposit")) return true;
  if (transactionTypes.withdrawals && typeMatches("withdrawal")) return true;
  if (transactionTypes.chargebacks && typeMatches("chargeback")) return true;
  if (transactionTypes.cashbacks && typeMatches("cashback")) return true;
  if (transactionTypes.referAndEarn && (typeMatches("referral") || typeMatches("refer"))) return true;

  return false;
};

export const filterTransactions = (
  transactions: Transaction[],
  period: string,
  dateRange: DateRange,
  transactionTypes: TransactionTypeFilters,
  statuses: StatusFilters
): Transaction[] => {
  return transactions.filter((tx) => {
    if (!filterByPeriod(tx, period, dateRange)) return false;
    if (!filterByStatus(tx, statuses)) return false;
    if (!filterByTransactionType(tx, transactionTypes)) return false;
    return true;
  });
};

export const hasFilterChanges = (
  current: {
    period: string;
    dateRange: DateRange;
    transactionTypes: TransactionTypeFilters;
    statuses: StatusFilters;
  },
  initial: {
    period: string;
    dateRange: DateRange;
    transactionTypes: TransactionTypeFilters;
    statuses: StatusFilters;
  }
): boolean => {
  if (current.period !== initial.period) return true;

  if (
    current.dateRange.from !== initial.dateRange.from ||
    current.dateRange.to !== initial.dateRange.to
  ) {
    return true;
  }

  const transactionTypesChanged = Object.keys(current.transactionTypes).some(
    (key) =>
      current.transactionTypes[key as keyof TransactionTypeFilters] !==
      initial.transactionTypes[key as keyof TransactionTypeFilters]
  );
  if (transactionTypesChanged) return true;

  const statusesChanged = Object.keys(current.statuses).some(
    (key) =>
      current.statuses[key as keyof StatusFilters] !==
      initial.statuses[key as keyof StatusFilters]
  );
  if (statusesChanged) return true;

  return false;
};
