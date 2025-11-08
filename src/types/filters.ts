export interface TransactionTypeFilters {
  storeTransactions: boolean;
  getTipped: boolean;
  deposit: boolean;
  withdrawals: boolean;
  chargebacks: boolean;
  cashbacks: boolean;
  referAndEarn: boolean;
}

export interface StatusFilters {
  successful: boolean;
  pending: boolean;
  failed: boolean;
}

export interface DateRange {
  from: string;
  to: string;
}

export interface FilterState {
  period: string;
  dateRange: DateRange;
  transactionTypes: TransactionTypeFilters;
  statuses: StatusFilters;
}
