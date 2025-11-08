import type { TransactionTypeFilters, StatusFilters } from "../types/filters";

export const DEFAULT_TRANSACTION_TYPES: TransactionTypeFilters = {
  storeTransactions: true,
  getTipped: true,
  deposit: true,
  withdrawals: true,
  chargebacks: true,
  cashbacks: true,
  referAndEarn: true,
};

export const DEFAULT_STATUSES: StatusFilters = {
  successful: true,
  pending: true,
  failed: true,
};

export const DEFAULT_PERIOD = "allTime";

export const PERIODS = [
  { label: "Today", value: "today" },
  { label: "Last 7 days", value: "last7days" },
  { label: "This month", value: "thisMonth" },
  { label: "Last 3 months", value: "last3months" },
  { label: "This year", value: "thisYear" },
  { label: "Last 1 year", value: "last1year" },
  { label: "All time", value: "allTime" },
] as const;

export const TRANSACTION_TYPE_OPTIONS = [
  { key: "storeTransactions", label: "Store Transactions" },
  { key: "getTipped", label: "Get Tipped" },
  { key: "deposit", label: "Deposit" },
  { key: "withdrawals", label: "Withdrawals" },
  { key: "chargebacks", label: "Chargebacks" },
  { key: "cashbacks", label: "Cashbacks" },
  { key: "referAndEarn", label: "Refer & Earn" },
] as const;

export const STATUS_OPTIONS = [
  { key: "successful", label: "Successful" },
  { key: "pending", label: "Pending" },
  { key: "failed", label: "Failed" },
] as const;
