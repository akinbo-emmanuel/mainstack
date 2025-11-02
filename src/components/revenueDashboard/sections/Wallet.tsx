import { BiInfoCircle } from "react-icons/bi";
import type { Wallet as WalletType } from "../../../types/api";

const Wallet = ({ wallet }: { wallet: WalletType }) => {
  return (
    <section className="space-y-8">
      <Card label="Ledger Balance" value={wallet!.ledger_balance} />

      <Card label="Total Payout" value={wallet!.total_payout} />

      <Card label="Total Revenue" value={wallet!.total_revenue} />

      <Card label="Pending Payout" value={wallet!.pending_payout} />
    </section>
  );
};

export default Wallet;

function Card({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm/4 text-[#56616B] font-medium">{label}</p>

        <BiInfoCircle size={20} className="text-[#888F95]" />
      </div>

      <p className="font-bold text-3xl">USD {value}</p>
    </div>
  );
}
