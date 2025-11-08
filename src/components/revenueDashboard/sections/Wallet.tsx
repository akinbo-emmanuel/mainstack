import { BiInfoCircle } from "react-icons/bi";
import type { Wallet as WalletType } from "../../../types/api";

const Wallet = ({ wallet, isLoading }: { wallet: WalletType | null; isLoading: boolean }) => {
  return (
    <section className="space-y-8">
      <Card label="Ledger Balance" value={wallet?.ledger_balance} isLoading={isLoading} />

      <Card label="Total Payout" value={wallet?.total_payout} isLoading={isLoading} />

      <Card label="Total Revenue" value={wallet?.total_revenue} isLoading={isLoading} />

      <Card label="Pending Payout" value={wallet?.pending_payout} isLoading={isLoading} />
    </section>
  );
};

export default Wallet;

function Card({ label, value, isLoading }: { label: string; value: number | undefined; isLoading: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm/4 text-[#56616B] font-medium">{label}</p>

        <BiInfoCircle size={20} className="text-[#888F95]" />
      </div>

      <p className={`font-bold text-3xl transition-all duration-500 ${
        isLoading ? "opacity-50" : "opacity-100 animate-fade-in"
      }`}>
        USD {isLoading ? "--" : value}
      </p>
    </div>
  );
}
