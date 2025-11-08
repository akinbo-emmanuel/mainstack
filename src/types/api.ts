export interface Wallet {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
}

export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export type TransactionType = string;
export type TransactionStatus = "successful" | "failed" | "pending";

export interface Transaction {
  amount: number;
  metadata?: {
    name?: string;
    type?: string;
    email?: string;
    quantity?: number;
    country?: string;
    product_name?: string;
  };
  payment_reference?: string;
  status: TransactionStatus;
  type: TransactionType;
  date: string;
}
