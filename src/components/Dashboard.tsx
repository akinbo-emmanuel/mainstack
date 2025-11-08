import { useWallet, useTransactions } from "../features/queries";
import Wallet from "./revenueDashboard/sections/Wallet";
import TransactionChart from "./revenueDashboard/sections/TransactionChart";
import TransactionsSection from "./revenueDashboard/TransactionsSection";
import { filterTransactions, countActiveFilters } from "../utils/filterUtils";
import {
  DEFAULT_PERIOD,
  DEFAULT_TRANSACTION_TYPES,
  DEFAULT_STATUSES,
} from "../constants/filters";
import type {
  TransactionTypeFilters,
  StatusFilters,
  DateRange,
} from "../types/filters";

interface DashboardProps {
  setIsFilterOpen: (open: boolean) => void;
  selectedPeriod: string;
  dateRange: DateRange;
  transactionTypes: TransactionTypeFilters;
  statuses: StatusFilters;
  onClearFilters: () => void;
}

export default function Dashboard({
  setIsFilterOpen,
  selectedPeriod,
  dateRange,
  transactionTypes,
  statuses,
  onClearFilters,
}: DashboardProps) {
  const { data: wallet, isLoading: wL, isError: wE } = useWallet();
  const { data: txs, isLoading: tL, isError: tE } = useTransactions();

  const filteredTransactions = txs
    ? filterTransactions(
        txs,
        selectedPeriod,
        dateRange,
        transactionTypes,
        statuses
      )
    : [];

  const activeFilterCount = countActiveFilters(
    selectedPeriod,
    dateRange,
    transactionTypes,
    statuses,
    {
      period: DEFAULT_PERIOD,
      transactionTypes: DEFAULT_TRANSACTION_TYPES,
      statuses: DEFAULT_STATUSES,
    }
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 mt-[100px] font-degular pt-16 pb-18">
      <div className="grid grid-cols-3 gap-30">
        <section className="col-span-2">
          <div className="flex items-center gap-16">
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

            <button className="px-6 py-3 bg-[#131316] text-white rounded-full font-semibold hover:bg-[#131316]/90 transition-colors">
              Withdraw
            </button>
          </div>

          <div className="mt-8">
            <TransactionChart
              transactions={filteredTransactions}
              isLoading={tL}
            />
          </div>
        </section>

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
        onClearFilters={onClearFilters}
        activeFilterCount={activeFilterCount}
      />
    </div>
  );
}
