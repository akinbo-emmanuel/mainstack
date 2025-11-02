import {
  MdKeyboardArrowDown,
  MdOutlineCallMade,
  MdOutlineCallReceived,
} from "react-icons/md";
import { useWallet, useTransactions } from "../features/queries";
import Wallet from "./revenueDashboard/sections/Wallet";
import { RxDownload } from "react-icons/rx";

const D = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

export default function Dashboard() {
  // const { data: user, isLoading: uL, isError: uE, error: uErr } = useUser();
  const { data: wallet, isLoading: wL, isError: wE, error: wErr } = useWallet();
  const {
    data: txs,
    isLoading: tL,
    isError: tE,
    error: tErr,
  } = useTransactions();

  if (wL || tL) return <p>Loading…</p>;
  if (wE) return <p className="text-red-600">Wallet error: {wErr.message}</p>;
  if (tE)
    return <p className="text-red-600">Transactions error: {tErr.message}</p>;

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
              <p className="font-bold text-4xl">USD {wallet!.balance}</p>
            </div>
          </div>
        </section>

        {/* Wallet */}
        <Wallet wallet={wallet!} />
      </div>

      <section className="mt-20">
        <div className="border-b border-[#EFF1F6] pb-6 flex items-center justify-between gap-6">
          <div>
            <p className="text-2xl/8 font-bold text-[#131316]">
              {txs!.length} Transactions
            </p>
            <p className="text-sm/4 text-[#56616B] font-medium">
              Your transactions for the last 7 days
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-full pl-7 pr-5 py-3 bg-[#EFF1F6] flex items-center gap-1 cursor-pointer transition-all duration-300 ease-in-out">
              <p className="text-[#131316] font-semibold leading-6">Filter</p>
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
          {txs!.map((t, i) => (
            <div key={i} className="flex items-center justify-between">
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
          ))}
        </div>
      </section>
    </div>
  );
}
