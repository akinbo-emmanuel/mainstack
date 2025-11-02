// src/features/Dashboard.tsx
import { useUser, useWallet, useTransactions } from "../features/queries";

const N = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});
const D = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

export default function Dashboard() {
  const { data: user, isLoading: uL, isError: uE, error: uErr } = useUser();
  const { data: wallet, isLoading: wL, isError: wE, error: wErr } = useWallet();
  const {
    data: txs,
    isLoading: tL,
    isError: tE,
    error: tErr,
  } = useTransactions();

  if (uL || wL || tL) return <p>Loading…</p>;
  if (uE) return <p className="text-red-600">User error: {uErr.message}</p>;
  if (wE) return <p className="text-red-600">Wallet error: {wErr.message}</p>;
  if (tE)
    return <p className="text-red-600">Transactions error: {tErr.message}</p>;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* User */}
      <section className="rounded-lg border p-4">
        <h2 className="text-lg font-semibold">Welcome</h2>
        <p className="text-gray-600">
          {user!.first_name} {user!.last_name} — {user!.email}
        </p>
      </section>

      {/* Wallet */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card label="Available Balance" value={N.format(wallet!.balance)} />
        <Card label="Total Revenue" value={N.format(wallet!.total_revenue)} />
        <Card label="Total Payout" value={N.format(wallet!.total_payout)} />
        <Card label="Pending Payout" value={N.format(wallet!.pending_payout)} />
        <Card label="Ledger Balance" value={N.format(wallet!.ledger_balance)} />
      </section>

      {/* Transactions */}
      <section className="rounded-lg border overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <Th>Date</Th>
              <Th>Type</Th>
              <Th>Status</Th>
              <Th className="text-right">Amount</Th>
              <Th>Customer / Product</Th>
              <Th>Reference</Th>
            </tr>
          </thead>
          <tbody>
            {txs!.map((t, i) => (
              <tr
                key={t.payment_reference ?? `${t.type}-${t.date}-${i}`}
                className="border-t"
              >
                <Td>{D.format(new Date(t.date))}</Td>
                <Td className="capitalize">{t.type}</Td>
                <Td>
                  <span
                    className={`rounded px-2 py-0.5 text-xs ${
                      t.status === "successful"
                        ? "bg-green-100 text-green-700"
                        : t.status === "pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t.status}
                  </span>
                </Td>
                <Td className="text-right">{N.format(t.amount)}</Td>
                <Td>
                  {t.metadata?.name ?? "—"}
                  {t.metadata?.product_name
                    ? ` • ${t.metadata.product_name}`
                    : ""}
                </Td>
                <Td className="font-mono text-xs">
                  {t.payment_reference ?? "—"}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}

function Th({
  children,
  className = "",
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <th
      className={`px-4 py-2 text-left font-medium text-gray-600 ${className}`}
    >
      {children}
    </th>
  );
}
function Td({
  children,
  className = "",
}: React.PropsWithChildren<{ className?: string }>) {
  return <td className={`px-4 py-2 ${className}`}>{children}</td>;
}
