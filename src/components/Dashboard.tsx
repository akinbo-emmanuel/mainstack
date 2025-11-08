import { useWallet, useTransactions } from "../features/queries";
import Wallet from "./revenueDashboard/sections/Wallet";
import TransactionsSection from "./revenueDashboard/TransactionsSection";
import { filterTransactions } from "../utils/filterUtils";
import type { TransactionTypeFilters, StatusFilters, DateRange } from "../types/filters";

interface DashboardProps {
  setIsFilterOpen: (open: boolean) => void;
  selectedPeriod: string;
  dateRange: DateRange;
  transactionTypes: TransactionTypeFilters;
  statuses: StatusFilters;
}

export default function Dashboard({
  setIsFilterOpen,
  selectedPeriod,
  dateRange,
  transactionTypes,
  statuses,
}: DashboardProps) {
  const { data: wallet, isLoading: wL, isError: wE } = useWallet();
  const { data: txs, isLoading: tL, isError: tE } = useTransactions();

  const filteredTransactions = txs
    ? filterTransactions(txs, selectedPeriod, dateRange, transactionTypes, statuses)
    : [];

  return (
    <div className="mx-auto max-w-6xl space-y-6 mt-[100px] font-degular pt-16 pb-18">
      <div className="grid grid-cols-3 gap-30">
        {/* Balance */}
        <section className="col-span-2">
          <div>
            <div className="space-y-2">
              <p className="text-sm/4 font-medium text-[#56616B]">
                Available Balance
              </p>
              {wE ? (
                <p className="text-sm text-red-600">Error loading balance</p>
              ) : (
                <p
                  className={`font-bold text-4xl transition-all duration-500 ${
                    wL ? "opacity-50" : "opacity-100 animate-fade-in"
                  }`}
                >
                  USD {wL ? "--" : wallet!.balance}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Wallet */}
        {wE ? (
          <div className="text-sm text-red-600">Error loading wallet data</div>
        ) : (
          <Wallet wallet={wL ? null : wallet!} isLoading={wL} />
        )}
      </div>

      <TransactionsSection
        transactions={filteredTransactions}
        isLoading={tL}
        isError={tE}
        onFilterClick={() => setIsFilterOpen(true)}
      />
    </div>
  );
}
