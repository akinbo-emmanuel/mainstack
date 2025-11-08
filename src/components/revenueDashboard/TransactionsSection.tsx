import {
  MdKeyboardArrowDown,
  MdOutlineCallMade,
  MdOutlineCallReceived,
} from "react-icons/md";
import { RxDownload } from "react-icons/rx";
import type { Transaction } from "../../types/api";
import EmptyState from "./EmptyState";

const D = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

interface TransactionsSectionProps {
  transactions: Transaction[];
  isLoading: boolean;
  isError: boolean;
  onFilterClick: () => void;
  onClearFilters: () => void;
  activeFilterCount: number;
}

export default function TransactionsSection({
  transactions,
  isLoading,
  isError,
  onFilterClick,
  onClearFilters,
  activeFilterCount,
}: TransactionsSectionProps) {
  return (
    <section className="mt-20">
      <div className="border-b border-[#EFF1F6] pb-6 flex items-center justify-between gap-6">
        <div>
          {isError ? (
            <p className="text-sm text-red-600">Error loading transactions</p>
          ) : (
            <>
              <p
                className={`text-2xl/8 font-bold text-[#131316] transition-all duration-500 ${
                  isLoading ? "opacity-50" : "opacity-100 animate-fade-in"
                }`}
              >
                {isLoading ? "--" : transactions.length} Transactions
              </p>
              <p className="text-sm/4 text-[#56616B] font-medium">
                Your transactions for the last 7 days
              </p>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onFilterClick}
            className="rounded-full pl-7 pr-5 py-3 bg-[#EFF1F6] flex items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#E5E7EB]"
          >
            <p className="text-[#131316] font-semibold leading-6">Filter</p>
            {activeFilterCount > 0 && (
              <span className="size-5 rounded-full bg-[#131316] text-white text-xs font-medium flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
            <MdKeyboardArrowDown size={16} />
          </button>
          <button className="rounded-full pl-7 pr-5 py-3 bg-[#EFF1F6] flex items-center gap-1 cursor-pointer transition-all duration-300 ease-in-out">
            <p className="text-[#131316] font-semibold leading-6">
              Export list
            </p>
            <RxDownload size={16} />
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {isError ? (
          <p className="text-sm text-red-600">
            Failed to load transactions. Please try again.
          </p>
        ) : isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between animate-pulse"
            >
              <div className="flex items-center gap-3.5">
                <div className="bg-gray-200 rounded-full w-12 h-12"></div>
                <div className="space-y-2">
                  <div className="bg-gray-200 h-4 w-32 rounded"></div>
                  <div className="bg-gray-200 h-3 w-24 rounded"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-gray-200 h-4 w-20 rounded"></div>
                <div className="bg-gray-200 h-3 w-16 rounded"></div>
              </div>
            </div>
          ))
        ) : transactions.length === 0 ? (
          <EmptyState onClearFilters={onClearFilters} />
        ) : (
          transactions.map((t, i) => (
            <div
              key={i}
              className="flex items-center justify-between animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`${
                    t.type === "deposit"
                      ? "bg-[#E3FCF2] text-[#075132]"
                      : "bg-[#F9E3E0] text-[#961100]"
                  } rounded-full p-3.5`}
                >
                  {t.type === "deposit" ? (
                    <MdOutlineCallReceived size={20} />
                  ) : (
                    <MdOutlineCallMade size={20} />
                  )}
                </div>

                <div className="space-y-2 font-medium">
                  <p className="leading-6 text-[#131316]">
                    {t.metadata?.name || "Cash Withdrawal"}
                  </p>
                  <p
                    className={`text-sm/4 text-[#56616B] capitalize ${
                      t.type === "withdrawal"
                        ? t.status === "successful"
                          ? "text-green-600"
                          : "text-[#A77A07]"
                        : ""
                    }`}
                  >
                    {t.metadata?.product_name || t.status}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-1">
                <p className="font-bold leading-[150%] text-[#131316]">
                  USD {t.amount}
                </p>
                <p className="text-sm/4 text-[#56616B] font-medium">
                  {D.format(new Date(t.date))}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
