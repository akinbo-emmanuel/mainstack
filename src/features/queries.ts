import { useQuery } from "@tanstack/react-query";
import { getJSON } from "../lib/api";
import type { User, Wallet, Transaction } from "../types/api";

export const qk = {
  user: ["user"] as const,
  wallet: ["wallet"] as const,
  transactions: ["transactions"] as const,
};

export function useUser() {
  return useQuery<User, Error>({
    queryKey: qk.user,
    queryFn: () => getJSON<User>("/user"),
    staleTime: 60_000,
  });
}

export function useWallet() {
  return useQuery<Wallet, Error>({
    queryKey: qk.wallet,
    queryFn: () => getJSON<Wallet>("/wallet"),
    staleTime: 60_000,
  });
}

export function useTransactions() {
  return useQuery<Transaction[], Error>({
    queryKey: qk.transactions,
    queryFn: () => getJSON<Transaction[]>("/transactions"),
    staleTime: 30_000,
  });
}
